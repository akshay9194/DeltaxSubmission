using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Threading.Tasks;
using Imdb.Common;
using Imdb.Common.DbModel;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;


namespace DeltaxImdbApp.Controllers
{
    [Route("api/IMdb")]
    public class IMdbController : Controller
    {
        // GET api/values
        [HttpGet("GetMovieInfo")]
        public async Task<IActionResult> GetMovieInfo()
        {
            List<GetimdbDataReturnModel> getimdbDataReturnModel = new List<GetimdbDataReturnModel>();
            try
            {
                using (var dbcontext = new MyDbContext(ConfigurationManager.ConnectionStrings["MyDbContext"].ConnectionString))
                {
                    var query = await dbcontext.GetimdbDataAsync().ConfigureAwait(false);
                    getimdbDataReturnModel = query.ToList();

                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return BadRequest();
            }
            return Ok(GetMappedResults(getimdbDataReturnModel));
        }

        [HttpPost("StoreMovieInfo")]
        public async Task<IActionResult> StoreMovieInfo([FromBody] List<ImdbStoreModel> imdbModels)
        {
            Parallel.ForEach(imdbModels, async item =>
            {
                await StoreDataInDb(item).ConfigureAwait(false);
            });
            return Ok();
        }

        private async Task StoreDataInDb(ImdbStoreModel item)
        {
            using (var dbContext = new MyDbContext("Server=localhost;Database=DeltaX;Trusted_Connection=True;"))
            {
                dbContext.Movies.Add(item.Movy);
                
                foreach (var actorItem in item.Actors)
                {
                    if(actorItem.ActorId == 0)
                    {
                        dbContext.Actors.Add(actorItem);
                    }
                    
                }
                
                if(item.Producer.ProducerId == 0)
                {
                    dbContext.Producers.Add(item.Producer);
                }

                MovieProducer movieProducer = new MovieProducer
                {
                    MovieId = item.Movy.MovieId,
                    ProducerId = item.Producer.ProducerId
                };

                dbContext.MovieProducers.Add(movieProducer);
                var res = await dbContext.SaveChangesAsync().ConfigureAwait(false);

                foreach (var actorItem in item.Actors)
                {
                    item.Movy.MovieProducerActors.Add(new MovieProducerActor
                    {
                        ActorId = actorItem.ActorId,
                        MovieId = item.Movy.MovieId
                    });
                }
                res = await dbContext.SaveChangesAsync().ConfigureAwait(false);
            }
        }

        [HttpGet("GetActor")]
        public async Task<IActionResult> GetActor()
        {
            List<Actor> getimdbDataReturnModel = new List<Actor>();
            try
            {
                using (var dbcontext = new MyDbContext(ConfigurationManager.ConnectionStrings["MyDbContext"].ConnectionString))
                {
                    var query = from c in dbcontext.Actors select c;
                    getimdbDataReturnModel = query.ToList();
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return BadRequest();
            }
            return Ok(GetMappedRes(getimdbDataReturnModel,null));
        }

        [HttpGet("GetProducer")]
        public async Task<IActionResult> GetProducer()
        {
            List<Producer> getimdbDataReturnModel = new List<Producer>();
            try
            {
                using (var dbcontext = new MyDbContext(ConfigurationManager.ConnectionStrings["MyDbContext"].ConnectionString))
                {
                    var query = from c in dbcontext.Producers select c;
                    getimdbDataReturnModel = query.ToList();

                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return BadRequest();
            }
            return Ok(GetMappedRes(null, getimdbDataReturnModel));
        }
        
        private List<ActorProducerModel> GetMappedRes(List<Actor> listObjs = null, List<Producer> listObjp = null)
        {
            List<ActorProducerModel> actorProducerModels = new List<ActorProducerModel>();
            if(listObjs == null)
            {
                foreach (var item in listObjp)
                {
                    actorProducerModels.Add(new ActorProducerModel
                    {
                        id = item.ProducerId,
                        name = item.Name
                    });
                }
            }
            else if(listObjp == null)
            {
                foreach (var item in listObjs)
                {
                    actorProducerModels.Add(new ActorProducerModel
                    {
                        id = item.ActorId,
                        name = item.Name
                    });
                }
            }
            
            return actorProducerModels;
        }

        private List<ImdbModel> GetMappedResults(List<GetimdbDataReturnModel> getimdbDataReturnModel)
        {
            List<ImdbModel> resObj = new List<ImdbModel>();

            getimdbDataReturnModel.ForEach(x =>
            {
                var matchRecord = resObj.FirstOrDefault(res => res.Movy.MovieId == x.MovieId);
                if(matchRecord == null)
                {
                    matchRecord = new ImdbModel
                    {
                        Movy = new Movy
                        {
                            MovieId = x.MovieId,
                            Bio = x.MovieBio,
                            Name = x.MovieName,
                            Plot = x.MoviePlot,
                            Poster = x.MoviePoster,
                            YoR = x.YearOfRelease
                        },
                        Producer = new Producer
                        {
                            Bio = x.ProducerBio,
                            Dob = Convert.ToDateTime(x.ProducerDob),
                            Name = x.ProducerName,
                            ProducerId = Convert.ToInt32(x.ProducerId),
                            Sex = x.ProducerSex
                        },
                        Actors = new List<Actor>()
                    };
                    resObj.Add(matchRecord);
                }

                matchRecord.Actors.Add(
                    new Actor
                    {
                        ActorId = x.ActorId,
                        Bio = x.ActorBio,
                        Dob = x.ActorDob,
                        Name = x.ActorName,
                        Sex = x.ActorSex
                    });
            });
            return resObj;
        }
    }
}
