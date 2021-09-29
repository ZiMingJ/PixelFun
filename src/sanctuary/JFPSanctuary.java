package sanctuary;
import java.util.*;

public final class JFPSanctuary implements Sanctuary {
  
  private Isolation isolation;
  private List<Enclosure> enclosures;
  private List<SpeciesType> speciesList;
  
  public JFPSanctuary(int isolationNum, int enclosureNum, int[] enclosureSize) {
    this.enclosures = new ArrayList<Enclosure>();
    this.isolation = new Isolation(isolationNum);
    for (int i = 0; i <= enclosureNum; i++) {
      this.enclosures.add(new Enclosure(i, enclosureSize[i]));
    }
  }
  
  @Override
  public boolean receiveNewMonkey(String name, SpeciesType species, Sex sex, Size size,
      float weight, int age, FavoriteFood favoriteFood) {
    Monkey monkey = this.isolation.addMonkey(name, species, sex, size, weight, age, favoriteFood);
    return this.isolation.receiveMonkey(monkey);
  }
  
  
  @Override
  public boolean moveMonkeyToEnclosure(Monkey monkey) {
    // When this species of monkeys have already had an enclosure, and there's available space.
    if(speciesList.contains(monkey.getSpecies()) 
        && enclosures.get(speciesList.indexOf(monkey.getSpecies())).receiveMonkey(monkey)) {
      isolation.removeMonkey(monkey);
      isolation.checkHealth(monkey, true);
      return true;
    }
    // When this species of monkeys is new, and there is an empty enclosure, and there's available space.
    else if (!(speciesList.contains(monkey.getSpecies())) 
        && speciesList.size() < enclosures.size() 
        && enclosures.get(speciesList.size()).receiveMonkey(monkey)) {
      isolation.removeMonkey(monkey);
      isolation.checkHealth(monkey, true);
      return true;
    }
    return false;
    
  }
  @Override
  public boolean moveMonkeyToIsolation(Monkey monkey) {
    if (isolation.receiveMonkey(monkey)) {
      enclosures.get(speciesList.indexOf(monkey.getSpecies())).removeMonkey(monkey);
      isolation.checkHealth(monkey, false);
      return true;
    }
    return false;
  }
  
  /*
   * 
   */
  @Override
  public Map<SpeciesType, Integer> getSpeciesList() {
  // Map<Species, Int>
  // Int represents location: 0 for isolation, 1 for enclosure,  2 for both, -1 for not housed
    Map<SpeciesType, Integer> speciesListReported = new  HashMap<SpeciesType, Integer>();
    for (SpeciesType x: speciesList) {
      speciesListReported.put(x, 1);
    }
    for (Monkey m: isolation.getMonkeyList()) {
      if (speciesListReported.containsKey(m.getSpecies()))
        speciesListReported.replace(m.getSpecies(), 2);
      else
        speciesListReported.put(m.getSpecies(), 0);
    }
    return speciesListReported;
  }
  
  
  @Override
  public int lookUpSpecies(Monkey monkey) {
    // Int represents location: 0 for isolation, 1 for enclosure,  2 for both, -1 for not housed
    return this.getSpeciesList().getOrDefault(monkey.getSpecies(), -1);
  }
  
  @Override
  public List<String> produceSign(int enclosureNo) {
    // Produce a sign for a given enclosure
    return this.enclosures.get(enclosureNo).produceSign();
    
  }
  //List<Name, Sex, FavoriteFood>
  
  @Override
  public Map<String, String> produceMonkeyList() {
    // String represents housing location: I for isolation, E for enclosure
    // Int represents room number.
    Map<String, String> totalMonkeyList = new HashMap<String, String>();
    
    int i = 0;
    for (Monkey m: isolation.getMonkeyList()) {
      totalMonkeyList.put(m.getName(), String.format("I%d", i));
      i++;
    }
    
    for (Enclosure e: enclosures) {
      for (Monkey m: e.getMonkeyList()) {
        totalMonkeyList.put(m.getName(), String.format("E%d", e.getEnclosureNo()));
      }
    }
    return totalMonkeyList;
  }
  
  
  @Override
  public Map<FavoriteFood, Integer> produceShoppingList() {
    Map<FavoriteFood, Integer> shoppingList = new HashMap<FavoriteFood, Integer>();
    
    for (Monkey m: isolation.getMonkeyList()) {
      FavoriteFood food = m.getFavoriteFood();
      int quantity = shoppingList.getOrDefault(food, 0);
      int itemQuantity = m.getSize() == Size.valueOf("SMALL")? 100 : 
        (m.getSize() == Size.valueOf("MEDIUM")? 250: 500);
      if (quantity == 0) {
        shoppingList.put(food, itemQuantity);
      }
      else {
        shoppingList.put(food, quantity + itemQuantity);
      }        
    }
    
    for (Enclosure e: enclosures) {
      for (Monkey m: e.getMonkeyList()) {
        FavoriteFood food = m.getFavoriteFood();
        int quantity = shoppingList.getOrDefault(food, 0);
        int itemQuantity = m.getSize() == Size.valueOf("SMALL")? 100 : 
          (m.getSize() == Size.valueOf("MEDIUM")? 250: 500);
        if (quantity == 0) {
          shoppingList.put(food, itemQuantity);
        }
        else {
          shoppingList.put(food, quantity + itemQuantity);
        }
      }
    }
    return shoppingList;
  }
  
  @Override
  public void expandSpace(ExpandType expandType, int space, int[] enclosureNo) {
    switch (expandType){
      case EXPAND_ISOLATION:
        isolation.addCapacity(space);
      case EXPAND_ENCLOSURE_NUMBER:
        enclosures.add(new Enclosure(enclosures.size(), space));
      case EXPAND_ENCLOSURE_SIZE:
        enclosures.get(enclosureNo[0]).addCapacity(space);
    }

  }
}
