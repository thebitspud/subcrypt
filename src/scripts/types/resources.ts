/** A generic class for constrained numerical resources */
class Resource {
  public now: number;
  public max: number;
  public min: number;

  /**
   * Creates a new Resource according to the specified parameters
   * @param base the initial quantity of the resource when created
   * @param max (optional) the upper constraint for resource quantity
   * @param min (optional) the lower constraint for resource quantity
   */
  constructor(base: number, max = base, min = 0) {
    this.now = base;
    this.max = max;
    this.min = min;
  }

  /**
   * Changes the current resource quantity by a specified amount
   * @param value the amount to increment (positive) or decrement (negative) by
   * @param ignoreLimits whether this action can result in the resource quantity
   * going above max or below min
   */
  public adjust(value: number, ignoreLimits = false) {
    if (!ignoreLimits) {
      if (value >= 0 && this.isOverflowing()) return;
      if (value <= 0 && this.isUnderflowing()) return;
    }

    if (ignoreLimits || this.isOverflowing() || this.isUnderflowing()) {
      this.now += value;
      return;
    }

    this.now += value;
    this.clamp();
  }

  /**
   * Sets the current resource quantity to a specified value
   * @param value the new quantity for the resource
   * @param ignoreLimits whether this action can result in a resource quantity
   * greater than max or less than min
   */
  public set(value: number, ignoreLimits = false) {
    this.now = value;
    if (!ignoreLimits) this.clamp();
  }

  /**
   * Clamps the resource quantity to be no greater than max and no lesser than min.
   * <br>Will swap max and min if min is greater than max.
   */
  public clamp() {
    if (this.min > this.max) [this.max, this.min] = [this.min, this.max];
    this.now = Math.min(Math.max(this.now, this.min), this.max);
  }

  /** Returns true if current resource quantity is greater than max resource quantity */
  public isOverflowing() {
    return this.now > this.max;
  }

  /** Returns true if current resource quantity is less than min resource quantity */
  public isUnderflowing() {
    return this.now < this.min;
  }
}

export default Resource;
