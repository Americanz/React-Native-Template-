import React, { FC, useEffect, useState } from "react";
import {
  ViewStyle,
  ScrollView,
  ImageStyle,
  TextStyle,
  Image,
} from "react-native";
import { Card, Text, View, Colors } from "react-native-ui-lib";
import { AppStackScreenProps } from "app/navigators";
import { Screen, Header } from "app/components";
import { spacing, colors } from "app/theme";
import { mockOrders } from "./mockOrders";

interface OrderDetailScreenProps extends AppStackScreenProps<"OrderDetail"> {}

const productPlaceholder = require("../../../../assets/images/product-placeholder.webp");

export const OrderDetailScreen: FC<OrderDetailScreenProps> = ({
  route,
  navigation,
}) => {
  const { orderId } = route.params;
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    const foundOrder = mockOrders.find((o) => o.id === orderId);
    setOrder(foundOrder || null);
  }, [orderId]);

  if (!order) {
    return (
      <Screen style={$container}>
        <Header
          title="Деталі покупки"
          leftIcon="back"
          onLeftPress={() => navigation.goBack()}
        />
        <View style={$contentContainer}>
          <Text text70>Замовлення не знайдено</Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen style={$container}>
      <Header
        title="Деталі покупки"
        leftIcon="back"
        onLeftPress={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={$contentContainer}>
        <View style={$orderDetails}>
          <View row spread marginV-8>
            <Text text80M>Номер: {order.id}</Text>
            <Text style={[$status, $statusColors[order.status]]}>
              {order.status.toUpperCase()}
            </Text>
          </View>

          <View row spread marginV-8>
            <Text text80M>Клієнт:</Text>
            <Text text80M>{order.customerName}</Text>
          </View>
          <View row spread marginV-8>
            <Text text80M>Дата замовлення:</Text>
            <Text text80M>{order.date}</Text>
          </View>

          <View row spread marginV-8>
            <Text text80M>Сума замовлення:</Text>
            <Text text70M>{order.total.toFixed(2)} ₴</Text>
          </View>
        </View>

        {order.items &&
          order.items.map((item: any) => (
            <Card key={item.id} style={$itemCard}>
              <View row centerV>
                <Image source={productPlaceholder} style={$itemImage} />
                <View flex row spread centerV>
                  <Text text80M numberOfLines={1} style={$itemName}>
                    {item.name}
                  </Text>
                  <Text text80>{item.quantity} x </Text>
                  <Text text70M color={Colors.red30}>
                    {item.price.toFixed(2)} ₴
                  </Text>
                </View>
              </View>
              <Text text90 color={Colors.grey50} style={$itemTotal}>
                Всього: {(item.price * item.quantity).toFixed(2)} ₴
              </Text>
            </Card>
          ))}
      </ScrollView>
    </Screen>
  );
};

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: Colors.white,
};

const $contentContainer: ViewStyle = {
  paddingHorizontal: spacing.lg,
};

const $orderDetails: ViewStyle = {
  marginVertical: spacing.lg,
};

const $itemCard: ViewStyle = {
  marginVertical: spacing.sm,
  padding: spacing.sm,
};

const $itemImage: ImageStyle = {
  width: 50,
  height: 50,
  marginRight: spacing.md,
};

const $itemName: TextStyle = {
  flex: 1,
  marginRight: spacing.sm,
  fontWeight: "bold",
};

const $itemTotal: TextStyle = {
  marginTop: spacing.xs,
  textAlign: "right",
};

const $status: TextStyle = {
  fontWeight: "bold",
};

const $statusColors: Record<Order["status"], TextStyle> = {
  pending: { color: colors.palette.angry500 },
  processing: { color: colors.palette.secondary500 },
  completed: { color: colors.palette.success500 },
  cancelled: { color: colors.palette.neutral500 },
};
