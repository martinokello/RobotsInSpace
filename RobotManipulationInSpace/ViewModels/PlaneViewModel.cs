using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RobotManipulationInSpace.ViewModels
{
    public class PlaneViewModel
    {
        public CoordinateViewModel Origin { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
    }
}
