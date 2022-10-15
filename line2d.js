class Line2D
{

  constructor(p1, p2)
  {
    this.p1 = p1;
    this.p2 = p2;
  }
  
  // create a function called equals, which takes in a variable called otherLine
  // inside this function:
  // check if this object's p1's x equals otherLine'1s p1's x
  // check if this object's p1's y equals otherLine'1s p1's y
  // check if this object's p2's x equals otherLine'1s p2's x
  // check if this object's p2's y equals otherLine'1s p2's y
  // if all of those were equal, return true
  // otherwise return false
  
  equals(otherLine)
  {
    // this.p1.x == otherLine.p1.x
    if (this.p1.x == otherLine.p1.x && this.p1.y == otherLine.p1.y && this.p2.x == otherLine.p2.x && this.p2.y == otherLine.p2.y)
    {
      return true;
    }
    else
    {
      return false;
    }
  }
  
}