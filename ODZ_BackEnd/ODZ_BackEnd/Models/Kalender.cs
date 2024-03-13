using System;
using System.Collections.Generic;

namespace ODZ_BackEnd.Models
{
    public partial class Kalender
    {
        public DateOnly Datum { get; set; }
        public int? Istfrei { get; set; }
    }
}
