using System;
using System.Collections.Generic;

namespace ODZ_BackEnd.Models
{
    public partial class Sessionlog
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; } = null!;
        public DateTime? Datum { get; set; }
    }
}
