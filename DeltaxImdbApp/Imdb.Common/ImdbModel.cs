using Imdb.Common.DbModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Imdb.Common
{
    /// <summary>
    /// ImdbModel.
    /// </summary>
    public class ImdbModel
    {
        /// <summary>
        /// Gets/Sets MovieModel.
        /// </summary>
        public Movy Movy { get; set; }
        /// <summary>
        /// Gets/Sets ActorModel.
        /// </summary>
        public IList<Actor> Actors { get; set; }
        /// <summary>
        /// Gets/Sets ProducerModel.
        /// </summary>
        public Producer Producer { get; set; }
        
    }

    /// <summary>
    /// ImdbModel.
    /// </summary>
    public class ImdbStoreModel
    {
        /// <summary>
        /// Gets/Sets MovieModel.
        /// </summary>
        public Movy Movy { get; set; }
        /// <summary>
        /// Gets/Sets ActorModel.
        /// </summary>
        public IList<Actor> Actors { get; set; }
        /// <summary>
        /// Gets/Sets ProducerModel.
        /// </summary>
        public Producer Producer { get; set; }
    }

    public class ActorProducerModel
    {
        public int id { get; set; }
        public string name { get; set; }
    }

}
