package sanctuary;
import java.util.*;

enum ExpandType {
  EXPAND_ISOLATION,
  EXPAND_ENCLOSURE_NUMBER,
  EXPAND_ENCLOSURE_SIZE
}

public interface Sanctuary {

  boolean receiveNewMonkey(String name, SpeciesType species, Sex sex, Size size,
      float weight, int age, FavoriteFood favoriteFood);
  
  boolean moveMonkeyToEnclosure(Monkey monkey);
  
  boolean moveMonkeyToIsolation(Monkey monkey);
  
  Map<SpeciesType, Integer> getSpeciesList();
  //Map<Species, Int>
  
  int lookUpSpecies(Monkey monkey);
  
  List<String> produceSign(int enclosureNo);
  //List<Name, Sex, FavoriteFood>
   
  Map<String, String> produceMonkeyList();
  //Map<Monkey, int>
  
  Map<FavoriteFood, Integer> produceShoppingList();
  //Map< FavoriteFood, Int>
  
  void expandSpace(ExpandType expandType, int space, int[] enclosureNo);
}
