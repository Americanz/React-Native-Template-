import React, { FC, useState, useMemo } from "react";
import { ViewStyle, TextStyle, FlatList } from "react-native";
import { observer } from "mobx-react-lite";
import {
  View,
  Text,
  StackAggregator,
  SegmentedControl,
  Switch,
} from "react-native-ui-lib";
import { AppStackScreenProps } from "app/navigators";
import { Screen, Header, Button } from "app/components";
import { colors, spacing } from "app/theme";
import { Order, mockOrders } from "./mockOrders";
import { OrderItem } from "./OrderItem";

interface OrderListScreenProps extends AppStackScreenProps<"OrderList"> {}

const segments = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Processing", value: "processing" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
];

export const OrderListScreen: FC<OrderListScreenProps> = observer(
  function OrderListScreen({ navigation }) {
    const [selectedSegment, setSelectedSegment] = useState<string>("all");
    const [collapsed, setCollapsed] = useState(true);
    const [isStackView, setIsStackView] = useState(true); // Додаємо стан для перемикання режиму перегляду

    const toggleCollapseAll = () => {
      setCollapsed(!collapsed);
    };

    const filteredOrders = useMemo(
      () =>
        selectedSegment === "all"
          ? mockOrders
          : mockOrders.filter((order) => order.status === selectedSegment),
      [selectedSegment]
    );

    const groupedOrders = useMemo(
      () =>
        filteredOrders.reduce((acc, order) => {
          if (!acc[order.date]) {
            acc[order.date] = [];
          }
          acc[order.date].push(order);
          return acc;
        }, {} as Record<string, Order[]>),
      [filteredOrders]
    );

    const buttonProps = {
      label: collapsed ? "Показати більше" : "Показати менше",
      size: "small",
      backgroundColor: "blue",
    };

    const renderOrderGroup = ({ item }: { item: [string, Order[]] }) => {
      const [date, orders] = item;
      return (
        <View key={date} style={$orderGroup}>
          <Text style={$dateText}>
            {date} - {orders.length} замовлень
          </Text>
          {isStackView ? (
            <StackAggregator
              collapsed={collapsed}
              title={`${orders.length} замовлень`}
              buttonProps={buttonProps}
            >
              {orders.map((order) => (
                <OrderItem key={order.id} order={order} />
              ))}
            </StackAggregator>
          ) : (
            <FlatList
              data={orders}
              renderItem={({ item }) => <OrderItem order={item} />}
              keyExtractor={(item) => item.id.toString()}
            />
          )}
        </View>
      );
    };

    return (
      <Screen style={$root} preset="fixed">
        <Header
          title="Список замовлень"
          leftIcon="back"
          onLeftPress={() => navigation.goBack()}
        />
        <SegmentedControl
          segments={segments}
          initialIndex={segments.findIndex(
            (seg) => seg.value === selectedSegment
          )}
          onChangeIndex={(index) => setSelectedSegment(segments[index].value)}
        />
        <View style={$toggleContainer}>
          <Text style={$toggleLabel}>Stack View</Text>
          <Switch value={isStackView} onValueChange={setIsStackView} />
        </View>
        {isStackView && (
          <Button
            text={collapsed ? "Розгорнути все" : "Згорнути все"}
            style={$button}
            preset="default"
            onPress={toggleCollapseAll}
          />
        )}
        <FlatList
          data={Object.entries(groupedOrders)}
          renderItem={renderOrderGroup}
          keyExtractor={(item) => item[0]} // Використовуємо дату як ключ
        />
      </Screen>
    );
  }
);

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
};

const $orderGroup: ViewStyle = {
  marginBottom: spacing.medium,
};

const $dateText: TextStyle = {
  color: colors.text,
  fontWeight: "bold",
  marginBottom: spacing.small,
  fontSize: 16,
  alignSelf: "center",
};

const $button: ViewStyle = {
  marginVertical: spacing.md,
};

const $toggleContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  marginVertical: spacing.md,
};

const $toggleLabel: TextStyle = {
  marginRight: spacing.sm,
  color: colors.text,
};
