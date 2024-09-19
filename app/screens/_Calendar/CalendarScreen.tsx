import { observer } from "mobx-react-lite";
import React, { FC, useState, useEffect } from "react";
import { View, ViewStyle, TextStyle, ScrollView } from "react-native";
import { Text, Screen, Header } from "app/components";
import { AppStackScreenProps } from "../../navigators";
import { colors, spacing } from "../../theme";
import { useSafeAreaInsetsStyle } from "../../utils/useSafeAreaInsetsStyle";
import { WeekView } from "./WeekView";

interface Event {
  id: number;
  date: Date;
  startTime: string;
  endTime: string;
  title: string;
  description: string;
}

const events: Event[] = [
  {
    id: 1,
    date: new Date(2024, 8, 2), // September 2, 2024
    startTime: "1:00PM",
    endTime: "3:00PM",
    title: "Joe Wilson",
    description: "Fashion styling private session",
  },
  {
    id: 2,
    date: new Date(2024, 8, 2), // September 2, 2024
    startTime: "2:00PM",
    endTime: "3:00PM",
    title: "Styling group sessions",
    description: "15/20 Arriving",
  },
  {
    id: 3,
    date: new Date(2024, 8, 2), // September 2, 2024
    startTime: "3:30PM",
    endTime: "6:00PM",
    title: "John Key",
    description: "With Judy Brown",
  },
  {
    id: 4,
    date: new Date(2024, 8, 17), // September 17, 2024
    startTime: "3:30PM",
    endTime: "6:00PM",
    title: "John Key",
    description: "With Judy Brown",
  },
];

interface CalendarScreenProps extends AppStackScreenProps<"CalendarScreen"> {}

export const CalendarScreen: FC<CalendarScreenProps> = observer(
  function CalendarScreen(_props) {
    const navigation = _props.navigation;
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);


    const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"]);

    useEffect(() => {
      const newFilteredEvents = events.filter(
        (event) => event.date.toDateString() === selectedDate.toDateString()
      );
      setFilteredEvents(newFilteredEvents);
    }, [selectedDate]);

    return (
      <Screen
        preset="scroll"
        contentContainerStyle={$container}
        // safeAreaEdges={["top", "bottom"]}
      >
        <Header
          title="Calendar"
          leftIcon="back"
          onLeftPress={() => navigation.goBack()}
        />
        <View style={$container}>
          <View style={$topContainer}>
            <WeekView
              currentDate={selectedDate}
              onDateSelect={setSelectedDate}
            />
          </View>

          <ScrollView style={[$bottomContainer, $bottomContainerInsets]}>
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <View key={event.id} style={$eventItem}>
                  <Text
                    style={$eventTime}
                  >{`${event.startTime} - ${event.endTime}`}</Text>
                  <Text style={$eventTitle}>{event.title}</Text>
                  <Text style={$eventDescription}>{event.description}</Text>
                </View>
              ))
            ) : (
              <Text style={$noEventsText}>No events for this day</Text>
            )}
          </ScrollView>
        </View>
      </Screen>
    );
  }
);

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
};

const $topContainer: ViewStyle = {
  padding: spacing.md,
};

const $bottomContainer: ViewStyle = {
  flex: 1,
  backgroundColor: colors.palette.neutral100,
  padding: spacing.md,
};

const $eventItem: ViewStyle = {
  marginBottom: spacing.md,
};

const $eventTime: TextStyle = {
  fontSize: 14,
  color: colors.textDim,
};

const $eventTitle: TextStyle = {
  fontSize: 16,
  fontWeight: "bold",
  marginVertical: spacing.xxs,
};

const $eventDescription: TextStyle = {
  fontSize: 14,
};

const $noEventsText: TextStyle = {
  fontSize: 16,
  textAlign: "center",
  marginTop: spacing.xl,
  color: colors.textDim,
};
