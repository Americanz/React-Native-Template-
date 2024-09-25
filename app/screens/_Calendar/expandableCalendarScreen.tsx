import React, { FC, useRef, useCallback } from "react";
import { observer } from "mobx-react-lite";
import { ViewStyle } from "react-native";
import { AppStackScreenProps } from "app/navigators";
import { Screen, Header } from "app/components";
import {
  ExpandableCalendar,
  AgendaList,
  CalendarProvider,
  WeekCalendar,
} from "react-native-calendars";
import testIDs from "./testIDs";
import { agendaItems, getMarkedDates } from "./mocks/agendaItems";
import AgendaItem from "./mocks/AgendaItem";
import { getTheme, themeColor, lightThemeColor } from "./mocks/theme";

const leftArrowIcon = require("./mocks/previous.png");
const rightArrowIcon = require("./mocks/next.png");
const ITEMS: any[] = agendaItems;

interface ExpandableCalendarScreenProps
  extends AppStackScreenProps<"ExpandableCalendar"> {
  weekView?: boolean;
}

export const ExpandableCalendarScreen: FC<ExpandableCalendarScreenProps> = observer(
  function ExpandableCalendarScreen(_props) {
    const { weekView } = _props;
    const navigation = _props.navigation;
    const marked = useRef(getMarkedDates());
    const theme = useRef(getTheme());
    const todayBtnTheme = useRef({
      todayButtonTextColor: themeColor,
    });

    const renderItem = useCallback(({ item }: any) => {
      return <AgendaItem item={item} />;
    }, []);

    return (
      <Screen style={$root} preset="scroll" safeAreaEdges={["top", "bottom"]}>
        <Header
          title="Expandable Calendar"
          leftIcon="back"
          onLeftPress={() => navigation.goBack()}
        />
        <CalendarProvider
          date={ITEMS[1]?.title}
          showTodayButton
          theme={todayBtnTheme.current}
        >
          {weekView ? (
            <WeekCalendar
              testID={testIDs.weekCalendar.CONTAINER}
              firstDay={0}
              markedDates={marked.current}
            />
          ) : (
            <ExpandableCalendar
              testID={testIDs.expandableCalendar.CONTAINER}
              theme={theme.current}
              firstDay={1}
              markedDates={marked.current}
              leftArrowImageSource={leftArrowIcon}
              rightArrowImageSource={rightArrowIcon}
            />
          )}
          {/* <AgendaList
            sections={ITEMS}
            renderItem={renderItem}
            sectionStyle={$section}
          /> */}
        </CalendarProvider>
      </Screen>
    );
  }
);

const $root: ViewStyle = {
  flex: 1,
};

const $section: ViewStyle = {
  backgroundColor: lightThemeColor,
  color: "grey",
  textTransform: "capitalize",
};
