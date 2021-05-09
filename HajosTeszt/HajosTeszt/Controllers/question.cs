using Hajos2.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hajos2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class question : ControllerBase
    {

        [HttpGet]
        [Route("questions/count")]

        public int metod()
        {
            HajostesztContext context = new HajostesztContext();
            int kerdesekszama = context.Questions.Count();
            return kerdesekszama;
        }

        [HttpGet]
        [Route("questions/{sorszam}")]

        public ActionResult metod2(int sorszam)
        {
            HajostesztContext context = new HajostesztContext();
            var kerdes = (from x in context.Questions where x.QuestionId == sorszam select x).FirstOrDefault();
            if (kerdes == null)
            {
                return BadRequest("Nincs ilyen kerdes");
            };
            return new JsonResult(kerdes);

        }

    }

}
