using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        private readonly DataContext dbContext;

        public BuggyController(DataContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet("auth")]
        [Authorize]
        public ActionResult<string> GetSecret()
        {   
            return "secret";
        }
        
        
        [HttpGet("not-found")]
        public ActionResult<AppUser> GetNotFound()
        {   
            var thing = this.dbContext.Users.Find(-1);

            if(thing is null) {
                return NotFound();
            }

            return thing;
        }

        
        [HttpGet("server-error")]
        public ActionResult<string> GetServerError()
        {   
            var thing = this.dbContext.Users.Find(-1);

            var thingToReturn = thing.ToString();

            return thingToReturn;
        }

        
        [HttpGet("bad-request")]
        public ActionResult<string> GetBadRequest()
        {
            return BadRequest("This was not a good request.");
        }
    }
}