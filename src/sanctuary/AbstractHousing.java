package sanctuary;

import java.util.List;


public abstract class AbstractHousing {
  private int capacity;
  private List<Monkey> monkeyList;
  
  protected boolean receiveMonkey(Monkey monkey) {
    if(!isAvailable(monkey)) {
      return false;
    }
    this.monkeyList.add(monkey);
    return true;
  }
  
  abstract protected boolean isAvailable(Monkey monkey);
  
  protected boolean removeMonkey(Monkey monkey) {
    return monkeyList.remove(monkey);
  }
  
  protected void addCapacity(int n) 
    throws IllegalArgumentException {
    if(n <=  0 ) {
      throw new IllegalArgumentException("New capacity must be positive");
    }
    this.setCapacity(this.getCapacity() + n);
  }

  public int getCapacity() {
    return capacity;
  }

  public void setCapacity(int capacity) {
    this.capacity = capacity;
  }
  
  public List<Monkey> getMonkeyList() {
    return monkeyList;
  }

}
