import React from "react";
import { ViewStyle, TextStyle, TouchableOpacity } from "react-native";
import { View, Text, Drawer, Colors } from "react-native-ui-lib";
import { useNavigation } from "@react-navigation/native";
import { Order } from "./mockOrders";
import { spacing, colors } from "app/theme";
import { AppStackParamList } from "app/navigators";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface DocumentItemProps {
  order: Order;
}

export function DocumentItem({ order }: DocumentItemProps) {
  const navigation = useNavigation<
    NativeStackNavigationProp<AppStackParamList>
  >();

  const handlePress = () => {
    navigation.navigate("OrderDetail", { orderId: order.id });
  };

  const renderContent = () => (
    <TouchableOpacity onPress={handlePress} style={$innerContainer}>
      <View style={$leftColumn}>
        <Text>N: {order.id}</Text>
        <Text style={$customerName}>{order.customerName}</Text>
        <Text style={$date}>{order.date}</Text>
      </View>
      <View style={$rightColumn}>
        <Text style={$total}>{order.total.toFixed(2)}</Text>
        <Text style={[$status, $statusColors[order.status]]}>
          {order.status.toUpperCase()}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={$container}>
      <Drawer
        rightItems={[
          {
            text: "Arhive",
            background: Colors.yellow30,
            onPress: handlePress,
          },
          {
            text: "Open",
            background: Colors.blue30,
            onPress: handlePress,
          },
        ]}
        leftItem={{
          text: "Delete",
          background: Colors.red30,
          onPress: () => console.log("delete pressed"),
        }}
      >
        {renderContent()}
      </Drawer>
    </View>
  );
}

const $container: ViewStyle = {
  marginBottom: spacing.md,
};

const $innerContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: spacing.sm,
  backgroundColor: colors.palette.accent100,
  borderRadius: 8,
  shadowColor: colors.palette.angry500,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 2,
  elevation: 2,
};

const $leftColumn: ViewStyle = {
  flexDirection: "column",
};

const $rightColumn: ViewStyle = {
  flexDirection: "column",
  alignItems: "flex-end",
};

const $date: TextStyle = {
  marginBottom: spacing.sm,
};

const $customerName: TextStyle = {
  fontWeight: "bold",
};

const $total: TextStyle = {
  fontWeight: "bold",
  color: colors.palette.primary500,
};

const $status: TextStyle = {
  fontWeight: "bold",
  marginTop: spacing.sm,
};

const $statusColors: Record<Order["status"], TextStyle> = {
  pending: { color: colors.palette.angry500 },
  processing: { color: colors.palette.secondary500 },
  completed: { color: colors.palette.success500 },
  cancelled: { color: colors.palette.neutral500 },
};
