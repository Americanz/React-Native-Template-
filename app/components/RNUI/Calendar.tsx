import * as React from "react";
import { StyleProp, ViewStyle, View } from "react-native";
import { observer } from "mobx-react-lite";
import { colors } from "app/theme";
import {
  ExpandableCalendar,
  AgendaList,
  CalendarProvider,
  WeekCalendar,
  LocaleConfig,
} from "react-native-calendars";
import { getTheme, themeColor } from "../../theme";

const leftArrowIcon = require("../assets/previous.png");
const rightArrowIcon = require("../assets/next.png");

type SupportedLanguages = "en" | "uk" ;

const localeConfigs: Record<SupportedLanguages, Partial<LocaleConfig>> = {

  en: {
    monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  },
  uk: {
    monthNames: ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'],
    monthNamesShort: ['Січ', 'Лют', 'Бер', 'Кві', 'Тра', 'Чер', 'Лип', 'Сер', 'Вер', 'Жов', 'Лис', 'Гру'],
    dayNames: ['Неділя', 'Понеділок', 'Вівторок', 'Середа', 'Четвер', 'Пятниця', 'Субота'],
    dayNamesShort: ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
  },
};

export interface CalendarProps {
  style?: StyleProp<ViewStyle>;
  items: Array<{
    title: string;
    data: Array<any>;
  }>;
  weekView?: boolean;
  language?: SupportedLanguages;
  renderItem?: (item: any) => React.ReactElement;
  onDayPress?: (day: any) => void;
  customAgendaList?: React.ReactElement;
  useCustomAgendaList?: boolean;
}

export const Calendar = observer(function Calendar(props: CalendarProps) {
  const {
    style,
    items,
    weekView = false,
    language = "en",
    renderItem,
    onDayPress,
    customAgendaList,
    useCustomAgendaList = false,
  } = props;

  const marked = React.useRef(getMarkedDates(items));
  const theme = React.useRef(getTheme());
  const todayBtnTheme = React.useRef({
    todayButtonTextColor: themeColor,
  });

  LocaleConfig.locales[language] = localeConfigs[language];
  LocaleConfig.defaultLocale = language;

  return (
    <CalendarProvider
      date={items[0]?.title}
      showTodayButton
      theme={todayBtnTheme.current}
      style={style}
      onDayPress={onDayPress}
    >
      {weekView ? (
        <WeekCalendar firstDay={0} markedDates={marked.current} />
      ) : (
        <ExpandableCalendar
          theme={theme.current}
          firstDay={1}
          markedDates={marked.current}
          leftArrowImageSource={leftArrowIcon}
          rightArrowImageSource={rightArrowIcon}
        />
      )}
      {useCustomAgendaList ? (
        <View style={$customListContainer}>{customAgendaList}</View>
      ) : (
        <AgendaList
          sections={items}
          renderItem={({ item }) => (renderItem ? renderItem(item) : null)}
          sectionStyle={$section}
        />
      )}
    </CalendarProvider>
  );
});

const $section: ViewStyle = {
  backgroundColor: colors.background,
  color: colors.text,
  textTransform: "capitalize",
};

const $customListContainer: ViewStyle = {
  flex: 1,
};
