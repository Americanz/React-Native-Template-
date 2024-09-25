import React, { FC } from "react";
import { observer } from "mobx-react-lite";
import { ViewStyle, FlatList, View, TextStyle } from "react-native";
import { AppStackScreenProps } from "app/navigators";
import { Screen, Text, Header, Button } from "app/components";
import { useStores } from "app/models";
import { spacing, colors } from "app/theme";
import { CartItemCard } from "app/components/_product/CartItemCard";

interface CartScreenProps extends AppStackScreenProps<"Cart"> {}

export const CartScreen: FC<CartScreenProps> = observer(function CartScreen({
  navigation,
}) {
  const { cartStore } = useStores();

  const renderItem = ({ item }) => {
    const product = item.product;
    if (!product) return null;

    return (
      <CartItemCard
        product={product}
        quantity={item.quantity}
        onIncrease={() =>
          cartStore.updateItemQuantity(item.productId, item.quantity + 1)
        }
        onDecrease={() =>
          cartStore.updateItemQuantity(item.productId, item.quantity - 1)
        }
        additionalContent={
          <Button
            text="Видалити"
            style={$deleteButton}
            onPress={() => cartStore.removeItem(item.productId)}
          />
        }
      />
    );
  };

  return (
    <Screen style={$root} preset="fixed">
      <Header
        title="Кошик"
        leftIcon="back"
        onLeftPress={() => navigation.goBack()}
      />
      {cartStore.items.length > 0 ? (
        <>
          <FlatList
            data={cartStore.items.slice()}
            renderItem={renderItem}
            keyExtractor={(item) => item.productId.toString()}
            contentContainerStyle={$listContent}
            extraData={cartStore.totalItems}
          />
          <View style={$footer}>
            <Text
              style={$totalText}
              text={`Загальна сума: ${cartStore.totalPrice.toFixed(2)} ₴`}
            />
            <Button
              text="Оформити замовлення"
              style={$checkoutButton}
              onPress={() => {
                console.log("Оформлення замовлення");
              }}
            />
          </View>
        </>
      ) : (
        <View style={$emptyCart}>
          <Text style={$emptyText} text="Ваш кошик порожній" />
        </View>
      )}
    </Screen>
  );
});

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
};

const $listContent: ViewStyle = {
  padding: spacing.sm,
};

const $footer: ViewStyle = {
  padding: spacing.md,
  borderTopWidth: 1,
  borderTopColor: colors.separator,
};

const $totalText: TextStyle = {
  fontSize: 18,
  fontWeight: "bold",
  marginBottom: spacing.sm,
};

const $emptyCart: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
};

const $emptyText: TextStyle = {
  fontSize: 18,
  color: colors.dim,
};

const $deleteButton: ViewStyle = {
  borderWidth: 0,
};

const $checkoutButton: ViewStyle = {
  backgroundColor: colors.palette.primary500,
  borderWidth: 0,
};
