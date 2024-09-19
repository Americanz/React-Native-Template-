import React, { useState, useCallback, useMemo } from "react";
import { View, ViewStyle, TextStyle, TouchableOpacity } from "react-native";
import { Text } from "app/components";
import { colors, spacing } from "../../theme";
import { DatePickerModal } from "react-native-paper-dates";
import { Menu } from "react-native-paper";

interface WeekViewProps {
  currentDate: Date;
  onDateSelect: (date: Date) => void;
}

const PeriodMenu = ({
  visible,
  onDismiss,
  onItemPress,
  selectedPeriod,
  today,
}) => {
  return (
    <Menu
      visible={visible}
      onDismiss={onDismiss}
      anchor={
        <TouchableOpacity
          onPress={() => onItemPress("today")}
          style={$todayButton}
        >
          <Text style={$todayButtonText}>
            {selectedPeriod} - {today}
          </Text>
        </TouchableOpacity>
      }
      style={$menuStyle}
    >
      <Menu.Item onPress={() => onItemPress("today")} title="День" />
      <Menu.Item onPress={() => onItemPress("week")} title="Тиждень" />
      <Menu.Item onPress={() => onItemPress("month")} title="Місяць" />
      <Menu.Item onPress={() => onItemPress("year")} title="Рік" />
    </Menu>
  );
};

export const WeekView: React.FC<WeekViewProps> = ({
  currentDate,
  onDateSelect,
}) => {
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<string>("Сьогодні");
  const [isWeekSelected, setIsWeekSelected] = useState<boolean>(false);

  const getWeekDates = useCallback((date: Date) => {
    const week = [];
    const start = new Date(date);
    const dayOfWeek = start.getDay();
    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    start.setDate(start.getDate() + diff);
    for (let i = 0; i < 7; i++) {
      week.push(new Date(start));
      start.setDate(start.getDate() + 1);
    }
    return week;
  }, []);

  const weekDates = useMemo(() => getWeekDates(currentDate), [
    currentDate,
    getWeekDates,
  ]);

  const changeWeek = useCallback(
    (direction: 1 | -1) => {
      const newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() + 7 * direction);
      onDateSelect(newDate);
    },
    [currentDate, onDateSelect]
  );

  const isToday = useCallback((date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }, []);

  const today = useMemo(
    () =>
      new Date().toLocaleDateString("uk-UA", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    []
  );

  const isSelected = useCallback(
    (date: Date) => {
      if (isWeekSelected) {
        return weekDates.some(
          (selectedDate) => selectedDate.toDateString() === date.toDateString()
        );
      } else {
        return date.toDateString() === currentDate.toDateString();
      }
    },
    [isWeekSelected, weekDates, currentDate]
  );

  const getMonthYearDisplay = useCallback(() => {
    const firstDay = weekDates[0];
    const lastDay = weekDates[6];
    if (firstDay && lastDay) {
      if (firstDay.getMonth() !== lastDay.getMonth()) {
        return `${firstDay.toLocaleString("uk-UA", {
          month: "long",
        })}/${lastDay.toLocaleString("uk-UA", {
          month: "long",
        })} ${lastDay.getFullYear()}`;
      }
      return `${firstDay.toLocaleString("uk-UA", {
        month: "long",
        year: "numeric",
      })}`;
    }
    return "";
  }, [weekDates]);

  const onDismissDatePicker = useCallback(() => {
    setIsDatePickerVisible(false);
  }, []);

  const onConfirmDatePicker = useCallback(
    ({ date }) => {
      setIsDatePickerVisible(false);
      if (date) {
        onDateSelect(date);
        setSelectedPeriod("Сьогодні");
        setIsWeekSelected(false);
      }
    },
    [onDateSelect]
  );

  const handleMenuItemPress = useCallback(
    (type: "today" | "week" | "month" | "year") => {
      setMenuVisible(false);
      switch (type) {
        case "today":
          onDateSelect(new Date());
          setSelectedPeriod("Сьогодні");
          setIsWeekSelected(false);
          break;
        case "week":
          const weekDates = getWeekDates(new Date());
          onDateSelect(weekDates[0]);
          setSelectedPeriod(
            `Тиждень з \n${weekDates[0].toLocaleDateString(
              "uk-UA"
            )} до ${weekDates[6].toLocaleDateString("uk-UA")}`
          );
          setIsWeekSelected(true);
          break;
        case "month":
          setSelectedPeriod("Місяць");
          setIsWeekSelected(false);
          break;
        case "year":
          setSelectedPeriod("Рік");
          setIsWeekSelected(false);
          break;
      }
    },
    [onDateSelect, getWeekDates]
  );

  return (
    <View>
      <View style={$weekHeader}>
        <TouchableOpacity onPress={() => changeWeek(-1)}>
          <Text style={$arrowText}>{"<"}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsDatePickerVisible(true)}>
          <Text style={$monthText}>{getMonthYearDisplay()}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => changeWeek(1)}>
          <Text style={$arrowText}>{">"}</Text>
        </TouchableOpacity>
      </View>
      <PeriodMenu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        onItemPress={handleMenuItemPress}
        selectedPeriod={selectedPeriod}
        today={today}
      />
      <View style={$weekContainer}>
        {weekDates.map((date, index) => (
          <View key={index} style={$dayContainer}>
            <Text style={$dayText}>
              {date.toLocaleString("uk-UA", { weekday: "short" })}
            </Text>
            <TouchableOpacity
              style={[
                $dateButton,
                isSelected(date) && $selectedDateButton,
                isToday(date) && $todayIndicator,
              ]}
              onPress={() => onDateSelect(date)}
            >
              <Text
                style={[
                  $dateText,
                  isSelected(date) && $selectedDateText,
                  isToday(date) && $todayDateText,
                ]}
              >
                {date.getDate()}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <DatePickerModal
        locale="uk-UA"
        mode="single"
        visible={isDatePickerVisible}
        onDismiss={onDismissDatePicker}
        date={currentDate}
        onConfirm={onConfirmDatePicker}
      />
    </View>
  );
};

const $weekHeader: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: spacing.xs,
};

const $monthText: TextStyle = {
  fontSize: 18,
  fontWeight: "bold",
  marginHorizontal: spacing.sm,
};

const $arrowText: TextStyle = {
  fontSize: 24,
};

const $todayButton: ViewStyle = {
  alignItems: "center",
  marginBottom: spacing.sm,
};

const $todayButtonText: TextStyle = {
  color: colors.palette.primary,
  fontSize: 14,
};

const $weekContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
};

const $dayContainer: ViewStyle = {
  alignItems: "center",
};

const $dayText: TextStyle = {
  fontSize: 12,
  color: colors.textDim,
  marginBottom: spacing.xxs,
  alignItems: "center",
};

const $dateButton: ViewStyle = {
  width: 36,
  height: 36,
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 18,
};

const $dateText: TextStyle = {
  alignItems: "center",
  fontSize: 16,
};

const $selectedDateButton: ViewStyle = {
  backgroundColor: colors.palette.primary,
};

const $selectedDateText: TextStyle = {
  color: colors.palette.neutral100,
};

const $todayIndicator: ViewStyle = {
  borderWidth: 1,
  borderColor: colors.palette.primary,
};

const $todayDateText: TextStyle = {};

const $menuStyle: ViewStyle = {
  width: 200,
};
