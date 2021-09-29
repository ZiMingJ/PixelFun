package sanctuary;

enum Sex {
  MALE, FEMALE
};

enum Size {
  SMALL, MEDIUM, LARGE
};

enum FavoriteFood {
  EGGS, FRUITS, INSECTS, LEAVES, NUTS, SEEDS, TREESAP
};

enum SpeciesType {
  DRILL, GUEREZA, HOWLER, MANGABEY, SAKI, SPIDER, SQUIRREL, TAMARIN
};


public class Monkey {
  private String name;
  private SpeciesType species;
  private Sex sex;
  private Size size;
  private float weight;
  private int age;
  private FavoriteFood favoriteFood;
  private boolean healthStatus;
  
  
  public Monkey(String name, SpeciesType species, Sex sex, Size size,
      float weight, int age, FavoriteFood favoriteFood) 
          throws IllegalArgumentException {
    if ( name == null || weight <= 0 || age <= 0) {
      throw new IllegalArgumentException("Monkey parameters should be valid");
    }
    this.name = name;
    this.species = species;
    this.sex = sex;
    this.size = size;
    this.weight = weight;
    this.age = age;
    this.favoriteFood = favoriteFood;
    this.healthStatus = false;
  }
  
  protected String createSignInfo() {
    return String.format("Name: %s, Sex: %s, FavoriteFood: %s",name, sex, favoriteFood);
  }
  
  protected String getName() {
    return name;
  }

  protected void setName(String name) {
    this.name = name;
  }

  protected SpeciesType getSpecies() {
    return species;
  }

  protected void setSpecies(SpeciesType species) {
    this.species = species;
  }

  protected Sex getSex() {
    return sex;
  }

  protected void setSex(Sex sex) {
    this.sex = sex;
  }

  protected float getWeight() {
    return weight;
  }

  protected void setWeight(float weight) {
    this.weight = weight;
  }

  protected int getAge() {
    return age;
  }

  protected void setAge(int age) {
    this.age = age;
  }

  protected FavoriteFood getFavoriteFood() {
    return favoriteFood;
  }

  protected void setFavoriteFood(FavoriteFood favoriteFood) {
    this.favoriteFood = favoriteFood;
  }

  protected void setSize(Size size) {
    this.size = size;
  }
      
  protected Size getSize() {
    return size;
  }
  
  
  protected boolean getHealthStatus() {
    return healthStatus;
  }
  
  protected boolean setHealthStatus(boolean health) {
    return this.healthStatus = health;
  }
}
