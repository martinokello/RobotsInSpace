using RobotManipulation.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RobotManipulation.Interfaces
{
    public interface ICommand
    {
        //Command to execute and return Robots with their final Position
        Robot[] Execute();
        //Command to execute from Stream and Print Out Results
        void ExecuteFromKeyboardStream();
    }
}
