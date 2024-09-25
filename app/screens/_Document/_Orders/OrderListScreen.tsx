import React from "react";
import { ViewStyle, FlatList, View } from "react-native";
import { observer } from "mobx-react-lite";
import { AppStackScreenProps } from "app/navigators";
import { Screen, Header, Icon } from "app/components";
import { spacing } from "app/theme";
import { mockOrders } from "./mockOrders";
import { DocumentItem } from "./OrderItem";

interface OrderListScreenProps extends AppStackScreenProps<"OrderList"> {}

export const OrderListScreen: React.FC<OrderListScreenProps> = observer(
  function OrderSearchScreen({ navigation }) {
    const dataDocuments = mockOrders;

    const rightActionComponent = (
      <View style={$rightAction}>
        <Icon icon="filter" onPress={() => console.log("Filter pressed")} />
        <Icon icon="calendar" onPress={() => console.log("Search pressed")} />
      </View>
    );

    return (
      <Screen style={$container} preset="fixed">
        <Header
          title="Orders"
          leftIcon="back"
          onLeftPress={() => navigation.goBack()}
          RightActionComponent={rightActionComponent}
        />
        <FlatList
          data={dataDocuments}
          renderItem={({ item }) => <DocumentItem order={item} />}
          keyExtractor={(item) => item.id.toString()}
        />
      </Screen>
    );
  }
);

const $rightAction: ViewStyle = {
  flexDirection: "row",
};

const $container: ViewStyle = {
  paddingBottom: spacing.xxl,
  paddingHorizontal: spacing.lg,
};
