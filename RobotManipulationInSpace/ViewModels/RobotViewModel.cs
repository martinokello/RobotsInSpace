using RobotManipulation.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RobotManipulationInSpace.ViewModels
{
    public class RobotViewModel
    {
        public CoordinateViewModel location { get; set; }
        public string Instructions { get; set; }
        public string Orientation { get; set; }
    }
}
