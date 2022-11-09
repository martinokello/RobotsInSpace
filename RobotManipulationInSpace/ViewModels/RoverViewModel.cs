using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RobotManipulationInSpace.ViewModels
{
    public class RoverViewModel
    {
        public PlaneViewModel Plane { get; set; }
        public List<RobotViewModel> Robots { get; set; }
    }
}
