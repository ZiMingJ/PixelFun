package sanctuary;

public class Isolation extends AbstractHousing{

  public Isolation(int isolationNum)  
      throws IllegalArgumentException {
    if (isolationNum <= 0) {
      throw new IllegalArgumentException("Isolation room number should be non-negative");
    }
    this.setCapacity(isolationNum);
  } 
  
  protected Monkey addMonkey(String name, SpeciesType species, Sex sex, Size size,
      float weight, int age, FavoriteFood favoriteFood) {
    Monkey monkey = new Monkey(name, species, sex, size, weight, age, favoriteFood);
    return monkey;
  }
  
  protected boolean checkHealth(Monkey monkey, boolean health) {
    return monkey.setHealthStatus(health);
  }

  @Override
  protected boolean isAvailable(Monkey monkey) {
    if (this.getMonkeyList().size() < this.getCapacity()) {
      return true;
    }
    else 
      return false;
  }
  
  
}
