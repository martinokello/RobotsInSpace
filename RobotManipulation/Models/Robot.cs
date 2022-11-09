using RobotManipulation.Interfaces;

namespace RobotManipulation.Models
{
    public class Robot:IMoveAbility
    {
        public Robot()
        {

        }

        public Robot(Plane plane) {
            Plane = plane;        
        }
        //vital for both Robot and Controller to know about the Plane extents, going forward.
        public string Instructions { get; set; }
        public Location Location { get; set; }
        public Plane Plane {get;set; } 
        public OrientationPosition.Orientation Orientation { get; set; }

        public bool CanMoveForward()
        {
            switch (this.Orientation)
            {
                case OrientationPosition.Orientation.N:
                    return Location.Y < Plane.GetYStretch();
                case OrientationPosition.Orientation.E:
                    return Location.X < Plane.GetXStretch();
                case OrientationPosition.Orientation.S:
                    return Location.Y > Plane.Origin.Y;
                case OrientationPosition.Orientation.W:
                    return Location.X > Plane.Origin.X;
            }
            return false;
        }
    }
}
