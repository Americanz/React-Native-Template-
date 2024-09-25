import React from "react";
import {
  StyleProp,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { Text } from "app/components";
import { colors, spacing } from "app/theme";

interface PaginationProps {
  /**
   * The current page number.
   */
  currentPage: number;
  /**
   * The total number of pages.
   */
  totalPages: number;
  /**
   * Called when a page number is pressed.
   */
  onPageChange: (page: number) => void;
  /**
   * Override the container style.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Override the page button style.
   */
  pageButtonStyle?: StyleProp<ViewStyle>;
  /**
   * Override the page button text style.
   */
  pageButtonTextStyle?: StyleProp<TextStyle>;
  /**
   * Override the current page button style.
   */
  currentPageButtonStyle?: StyleProp<ViewStyle>;
  /**
   * Override the current page text style.
   */
  currentPageTextStyle?: StyleProp<TextStyle>;
  /**
   * Override the navigation button style.
   */
  navigationButtonStyle?: StyleProp<ViewStyle>;
  /**
   * Override the navigation button text style.
   */
  navigationButtonTextStyle?: StyleProp<TextStyle>;
}

/**
 * A pagination component that works on both iOS and Android.
 */
export function Pagination(props: PaginationProps) {
  const {
    currentPage,
    totalPages,
    onPageChange,
    style: $containerStyleOverride,
    pageButtonStyle: $pageButtonStyleOverride,
    pageButtonTextStyle: $pageButtonTextStyleOverride,
    currentPageButtonStyle: $currentPageButtonStyleOverride,
    currentPageTextStyle: $currentPageTextStyleOverride,
    navigationButtonStyle: $navigationButtonStyleOverride,
    navigationButtonTextStyle: $navigationButtonTextStyleOverride,
  } = props;

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 3;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <TouchableOpacity
          key={i}
          style={[
            $pageButton,
            $pageButtonStyleOverride,
            i === currentPage && [
              $currentPageButton,
              $currentPageButtonStyleOverride,
            ],
          ]}
          onPress={() => onPageChange(i)}
        >
          <Text
            text={i.toString()}
            style={[
              $pageButtonText,
              $pageButtonTextStyleOverride,
              i === currentPage && [
                $currentPageText,
                $currentPageTextStyleOverride,
              ],
            ]}
          />
        </TouchableOpacity>
      );
    }

    if (endPage < totalPages) {
      pageNumbers.push(
        <Text key="ellipsis" style={$ellipsis}>
          ...
        </Text>
      );
      pageNumbers.push(
        <TouchableOpacity
          key={totalPages}
          style={[$pageButton, $pageButtonStyleOverride]}
          onPress={() => onPageChange(totalPages)}
        >
          <Text
            text={totalPages.toString()}
            style={[$pageButtonText, $pageButtonTextStyleOverride]}
          />
        </TouchableOpacity>
      );
    }

    return pageNumbers;
  };

  return (
    <View style={[$container, $containerStyleOverride]}>
      <TouchableOpacity
        style={[
          $navigationButton,
          $navigationButtonStyleOverride,
          currentPage === 1 && $disabledButton,
        ]}
        onPress={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <Text
          text="Prev"
          style={[$navigationButtonText, $navigationButtonTextStyleOverride]}
        />
      </TouchableOpacity>

      <View style={$pageNumbersContainer}>{renderPageNumbers()}</View>

      <TouchableOpacity
        style={[
          $navigationButton,
          $navigationButtonStyleOverride,
          currentPage === totalPages && $disabledButton,
        ]}
        onPress={() =>
          currentPage < totalPages && onPageChange(currentPage + 1)
        }
        disabled={currentPage === totalPages}
      >
        <Text
          text="Next"
          style={[$navigationButtonText, $navigationButtonTextStyleOverride]}
        />
      </TouchableOpacity>
    </View>
  );
}

const $container: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  padding: spacing.small,
};

const $pageNumbersContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
};

const $pageButton: ViewStyle = {
  minWidth: 40,
  minHeight: 40,
  borderRadius: 20,
  backgroundColor: colors.palette.neutral200,
  justifyContent: "center",
  alignItems: "center",
  marginHorizontal: spacing.tiny,
};

const $currentPageButton: ViewStyle = {
  backgroundColor: colors.palette.neutral800,
};

const $pageButtonText: TextStyle = {
  fontSize: 16,
  color: colors.text,
};

const $currentPageText: TextStyle = {
  color: colors.palette.neutral100,
};

const $ellipsis: TextStyle = {
  fontSize: 16,
  marginHorizontal: spacing.tiny,
};

const $navigationButton: ViewStyle = {
  paddingHorizontal: spacing.medium,
  minHeight: 40,
  borderRadius: 20,
  backgroundColor: colors.palette.neutral200,
  justifyContent: "center",
  alignItems: "center",
};

const $navigationButtonText: TextStyle = {
  fontSize: 16,
  color: colors.text,
};

const $disabledButton: ViewStyle = {
  opacity: 0.5,
};

export default Pagination;
