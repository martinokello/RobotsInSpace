
namespace RobotManipulation.Models
{
    public class Plane
    {
        public Plane() { }
        public int Width { get; set; }
        public int Height { get; set; }

        public Location Origin;
        public Plane(int X, int Y, Location origin)
        {
            Width = X;
            Height = Y;
            Origin = origin;
        }

        public int GetXStretch()
        {
            return Width;
        }
        public int GetYStretch()
        {
            return Height;
        }
    }
}
