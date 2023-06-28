using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext dbContext;
        private readonly ITokenService tokenService;
        private readonly IMapper mapper;

        public AccountController(DataContext dbContext, ITokenService tokenService, IMapper mapper)
        {
            this.dbContext = dbContext;
            this.tokenService = tokenService;
            this.mapper = mapper;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if(await UserExists(registerDto.Username))
            {
                return BadRequest("Username is taken.");
            }

            var user = this.mapper.Map<AppUser>(registerDto);

            using var hmac = new HMACSHA512();

            user.UserName = registerDto.Username.ToLower();
            user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password));
            user.PasswordSalt = hmac.Key;

            this.dbContext.Users.Add(user);

            await this.dbContext.SaveChangesAsync();

            return new UserDto 
            {
                Username = user.UserName,
                KnownAs = user.KnownAs,
                Token = this.tokenService.CreateToken(user)
            };
        } 

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await this.dbContext.Users
                .Include(x => x.Photos)
                .SingleOrDefaultAsync(u => u.UserName == loginDto.Username);

            if(user is null)
            {
                return Unauthorized();
            }

            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            for (int i = 0; i < computedHash.Length; i++)
            {
                if(computedHash[i] != user.PasswordHash[i])
                {
                    return Unauthorized("Invalid Password");
                }
            }

            return new UserDto 
            {
                Username = user.UserName,
                KnownAs = user.KnownAs,
                Token = this.tokenService.CreateToken(user),
                PhotoUrl = user.Photos.FirstOrDefault(x => x.IsMain)?.Url
            };
        }

        private async Task<bool> UserExists(string username)
        {
            return await this.dbContext.Users.AnyAsync(u => u.UserName == username.ToLower());
        }

    }
}