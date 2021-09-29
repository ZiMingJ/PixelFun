package sanctuary;
import java.util.ArrayList;
import java.util.List;

public class Enclosure extends AbstractHousing{
  private final int enclosureNo;
  
  public Enclosure(int enclosureNo, int capacity)
    throws IllegalArgumentException {
      if ( enclosureNo < 0 || capacity <= 0) {
        throw new IllegalArgumentException("EnclosureNo  should be non-negative should be positive");
      }
    this.enclosureNo = enclosureNo;
    this.setCapacity(capacity);
  }
  
  @Override
  protected boolean isAvailable(Monkey monkey) {
    int room = this.getCapacity();
    for (Monkey m: this.getMonkeyList()) {
      switch (m.getSize()) {
        case SMALL: 
          room -= 1;
        case MEDIUM: 
          room -= 5;
        case LARGE: 
          room -= 10;
      }
    }
    return (room >= (monkey.getSize() == Size.valueOf("SMALL")? 1 : 
      (monkey.getSize() == Size.valueOf("MEDIUM")? 5: 10)));
  }
  
  protected int getEnclosureNo() {
    return this.enclosureNo;
  }
  
  protected List<String> produceSign() {
    List<String> signList = new ArrayList<String>();
    for (Monkey m: this.getMonkeyList()) {
      signList.add(m.createSignInfo());
    }
    return signList;
  }
 

 
  
  
  
}
