import React, { FC, useState } from "react";
import {
  View,
  Modal,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  ViewStyle,
  TextStyle,
} from "react-native";
import { IconButton, Button } from "react-native-paper";
import { colors } from "app/theme";

interface AddToCartButtonProps {
  onPress: () => void;
  onDecrement?: () => void;
  onQuantityChange: (quantity: number) => void;
  quantity: number;
}

export const AddToCartButton: FC<AddToCartButtonProps> = ({
  onPress,
  onDecrement,
  onQuantityChange,
  quantity,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState(quantity.toString());

  const handleQuantityPress = () => {
    setModalVisible(true);
    setInputValue(quantity.toString());
  };

  const handleModalConfirm = () => {
    const newQuantity = parseInt(inputValue, 10);
    if (!isNaN(newQuantity) && newQuantity >= 0) {
      onQuantityChange(newQuantity);
    }
    setModalVisible(false);
  };

  if (quantity === 0) {
    return (
      <IconButton
        icon="plus"
        mode="contained"
        onPress={onPress}
        style={$addButton}
        size={20}
      />
    );
  }

  return (
    <>
      <Button
        mode="contained"
        onPress={onPress}
        style={$quantityButton}
        contentStyle={$quantityButtonContent}
        labelStyle={$quantityButtonLabel}
      >
        {quantity === 1 ? (
          <IconButton
            icon="cart-remove"
            size={16}
            onPress={onDecrement}
            style={$iconButton}
          />
        ) : (
          <IconButton
            icon="minus"
            size={16}
            onPress={onDecrement}
            style={$iconButton}
          />
        )}
        <TouchableOpacity
          onPress={handleQuantityPress}
          style={$quantityTextButton}
        >
          <Text style={$quantityText}>{quantity}</Text>
        </TouchableOpacity>
        <IconButton
          icon="plus"
          size={16}
          onPress={onPress}
          style={$iconButton}
        />
      </Button>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={$centeredView}>
          <View style={$modalView}>
            <TextInput
              style={$input}
              onChangeText={setInputValue}
              value={inputValue}
              keyboardType="numeric"
              placeholder="Enter quantity"
            />
            <View style={$buttonContainer}>
              <TouchableOpacity
                style={[$button, $buttonCancel]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={$textStyle}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[$button, $buttonConfirm]}
                onPress={handleModalConfirm}
              >
                <Text style={$textStyle}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const $addButton: ViewStyle = {
  backgroundColor: colors.palette.primary500,
};

const $quantityButton: ViewStyle = {
  backgroundColor: colors.palette.primary500,
  borderRadius: 4,
};

const $quantityButtonContent: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  height: 36,
};

const $quantityButtonLabel: TextStyle = {
  fontSize: 16,
  marginHorizontal: 4,
};

const $iconButton: ViewStyle = {
  margin: 0,
  padding: 0,
};

const $quantityTextButton: ViewStyle = {
  minWidth: 40,
  height: 36,
  justifyContent: "center",
  alignItems: "center",
};

const $quantityText: TextStyle = {
  color: "white",
  fontSize: 16,
};

const $centeredView: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(0,0,0,0.5)",
};

const $modalView: ViewStyle = {
  margin: 20,
  backgroundColor: "white",
  borderRadius: 20,
  padding: 35,
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
};

const $input: ViewStyle = {
  height: 40,
  margin: 12,
  borderWidth: 1,
  padding: 10,
  width: 200,
};

const $buttonContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  width: "100%",
  marginTop: 15,
};

const $button: ViewStyle = {
  borderRadius: 20,
  padding: 10,
  elevation: 2,
  minWidth: 80,
};

const $buttonCancel: ViewStyle = {
  backgroundColor: "#FF0000",
};

const $buttonConfirm: ViewStyle = {
  backgroundColor: colors.palette.primary500,
};

const $textStyle: TextStyle = {
  color: "white",
  fontWeight: "bold",
  textAlign: "center",
};

export default AddToCartButton;
