import React, { FC } from "react";
import { observer } from "mobx-react-lite";
import { ViewStyle, FlatList, View, Dimensions } from "react-native";
import { AppStackScreenProps } from "app/navigators";
import { Screen, Text, Header } from "app/components";
import { CardComponent } from "./CardComponent";
import { cardData } from "./cardData";

interface CardComponentScreenProps
  extends AppStackScreenProps<"CardComponentScreen"> {}

const windowWidth = Dimensions.get("window").width;
const cardWidth = (windowWidth - 40) / 3; // 40 це загальний горизонтальний паддінг

export const CardComponentScreen: FC<CardComponentScreenProps> = observer(
  function CardComponentScreen({ navigation }) {
    const renderItem = ({ item, index }) => (
      <View style={[$cardWrapper, index % 3 === 2 ? $lastInRow : null]}>
        <CardComponent
          title={item.title}
          description={item.description}
          image={item.image}
          disabled={item.disabled}
          checked={item.checked}
          onPress={() => {
            // Тут ви можете оновити стан checked, наприклад:
            // updateCardCheckedStatus(item.title, !item.checked)
          }}
        />
      </View>
    );

    return (
      <Screen style={$root} preset="fixed">
        <Header
          title="Card Components"
          leftIcon="back"
          onLeftPress={() => navigation.goBack()}
        />
        <FlatList
          ListHeaderComponent={
            <View style={$headerContainer}>
              <Text text="Select Categories" style={$title} />
            </View>
          }
          data={cardData}
          renderItem={renderItem}
          keyExtractor={(item) => item.title}
          numColumns={3}
          contentContainerStyle={$listContent}
        />
      </Screen>
    );
  }
);

const $root: ViewStyle = {
  flex: 1,
};

const $headerContainer: ViewStyle = {
  paddingHorizontal: 10,
  paddingTop: 20,
};

const $listContent: ViewStyle = {
  padding: 10,
};

const $title: TextStyle = {
  fontSize: 24,
  fontWeight: "bold",
  marginBottom: 20,
  textAlign: "center",
};

const $cardWrapper: ViewStyle = {
  width: cardWidth,
  marginBottom: 10,
  marginRight: 10,
};

const $lastInRow: ViewStyle = {
  marginRight: 0,
};
