using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using RobotManipulationInSpace.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RobotManipulation.Models;
using RobotManipulation.Concretes;

namespace RobotManipulationInSpace.Controllers
{
    public class HomeController : Controller
    {
        Mapper _mapper;
        public HomeController(Mapper mapper)
        {
            _mapper = mapper;
        }
        public async Task<IActionResult> SetUpPlaneAndRobots([FromBody] RoverViewModel roverViewModel)
        {
            try
            {
                var robotPlane = _mapper.Map<Plane>(roverViewModel.Plane);
                var robotList = _mapper.Map<List<Robot>>(roverViewModel.Robots);
                SetRobotOrientationToEnums(roverViewModel.Robots,robotList);
                var robotController = new RobotController(robotPlane);
                var environmentSetup = new EnvironmentSetup(robotController, robotPlane, robotList);

                var robotResults = environmentSetup.Execute();
                var robotArray = _mapper.Map<RobotViewModel[]>(robotResults);
                SetEnumOrientationToString(robotArray);
                return await Task.FromResult(Ok(new { Robots = robotArray, Message = "" }));
            }
            catch(Exception e)
            {
                //Should really log this exception but time constraints Forbids.
                return await Task.FromResult(BadRequest( new {Robots = new Robot[] { }, Message="Bad Request!!" }));
            }
        }

        private void SetEnumOrientationToString(RobotViewModel[] robotArray)
        {
            foreach(var rb in robotArray)
            {
                rb.Orientation = rb.Orientation.ToString();
            }
        }

        public void SetRobotOrientationToEnums(List<RobotViewModel> robotModels,List<Robot> robots)
        {
            for(var n = 0;n < robots.Count ;n++)
            {
                robots[n].Orientation = Enum.Parse<OrientationPosition.Orientation>(robotModels[n].Orientation);
            }
        }

    }
}
