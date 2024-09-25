import React, { FC, useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import {
  ViewStyle,
  ScrollView,
  ActivityIndicator,
  TextStyle,
} from "react-native";
import { AppStackScreenProps } from "app/navigators";
import { Screen, Header } from "app/components";
import {
  List,
  Button,
  Card,
  Paragraph,
  DataTable,
  Text,
  Snackbar,
} from "react-native-paper";
import * as Sharing from "expo-sharing";
import * as dbOperations from "app/db/dbOperations";
import { initDatabase } from "app/db/dbManager";
import { colors } from "app/theme";

interface DatabaseInfoScreenProps extends AppStackScreenProps<"DatabaseInfo"> {}

export const DatabaseInfoScreen: FC<DatabaseInfoScreenProps> = observer(
  function DatabaseInfoScreen({ navigation }) {
    const [databaseInfo, setDatabaseInfo] = useState<DatabaseInfo | null>(null);
    const [tableInfo, setTableInfo] = useState<Record<string, TableInfo>>({});
    const [expandedTable, setExpandedTable] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    useEffect(() => {
      const setupDatabase = async () => {
        try {
          setIsLoading(true);
          await initDatabase();
          const info = await dbOperations.getDatabaseInfo();
          setDatabaseInfo(info);
        } catch (err) {
          console.error("Error in setupDatabase:", err);
          setError(
            "Failed to initialize database: " +
              (err instanceof Error ? err.message : String(err))
          );
        } finally {
          setIsLoading(false);
        }
      };
      setupDatabase();
    }, []);

    const fetchTableInfo = async (tableName: string) => {
      try {
        const info = await dbOperations.getTableInfo(tableName);
        setTableInfo((prev) => ({ ...prev, [tableName]: info }));
      } catch (error) {
        console.error(`Error fetching info for table ${tableName}:`, error);
        setSnackbarMessage(`Failed to fetch info for table ${tableName}`);
        setSnackbarVisible(true);
      }
    };

    const exportDatabase = async () => {
      if (!databaseInfo) return;
      try {
        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(databaseInfo.path);
          setSnackbarMessage("Database exported successfully");
        } else {
          setSnackbarMessage("Sharing is not available on this platform");
        }
        setSnackbarVisible(true);
      } catch (error) {
        console.error("Error exporting database:", error);
        setSnackbarMessage("Failed to export database");
        setSnackbarVisible(true);
      }
    };

    if (isLoading) {
      return (
        <Screen preset="fixed" style={$loadingContainer}>
          <ActivityIndicator size="large" color={colors.palette.primary500} />
        </Screen>
      );
    }

    if (error) {
      return (
        <Screen preset="fixed" style={$errorContainer}>
          <Text style={$errorText}>{error}</Text>
        </Screen>
      );
    }

    return (
      <Screen preset="scroll">
        <Header
          title="Database Info"
          leftIcon="back"
          onLeftPress={() => navigation.goBack()}
        />
        <ScrollView style={$root}>
          {databaseInfo && (
            <>
              <Card style={$card}>
                <Card.Title title="Database Information" />
                <Card.Content>
                  <Paragraph>Name: {databaseInfo.name}</Paragraph>
                  <Paragraph>Size: {databaseInfo.size}</Paragraph>
                  <Paragraph>Path: {databaseInfo.path}</Paragraph>
                  <Paragraph>
                    SQLite Version: {databaseInfo.version || "Unknown"}
                  </Paragraph>
                  <Paragraph>
                    Number of Tables: {databaseInfo.tables.length}
                  </Paragraph>
                </Card.Content>
              </Card>

              <Card style={$card}>
                <Card.Title title="Tables" />
                <Card.Content>
                  <List.Accordion
                    title={`Tables (${databaseInfo.tables.length})`}
                    expanded={expandedTable === "tables"}
                    onPress={() =>
                      setExpandedTable(
                        expandedTable === "tables" ? null : "tables"
                      )
                    }
                  >
                    {databaseInfo.tables.map((table) => (
                      <List.Accordion
                        key={table}
                        title={table}
                        expanded={expandedTable === table}
                        onPress={() => {
                          setExpandedTable(
                            expandedTable === table ? null : table
                          );
                          if (!tableInfo[table]) {
                            fetchTableInfo(table);
                          }
                        }}
                      >
                        {tableInfo[table] ? (
                          <>
                            <Paragraph>
                              Row Count: {tableInfo[table].rowCount}
                            </Paragraph>
                            <Paragraph>Columns:</Paragraph>
                            {tableInfo[table].columns.map((col, index) => (
                              <Paragraph key={index}>
                                {col.name} ({col.type})
                              </Paragraph>
                            ))}
                            <DataTable>
                              <DataTable.Header>
                                {tableInfo[table].columns.map((col) => (
                                  <DataTable.Title key={col.name}>
                                    {col.name}
                                  </DataTable.Title>
                                ))}
                              </DataTable.Header>
                              {tableInfo[table].sampleData.map((row, index) => (
                                <DataTable.Row key={index}>
                                  {tableInfo[table].columns.map((col) => (
                                    <DataTable.Cell key={col.name}>
                                      {String(row[col.name])}
                                    </DataTable.Cell>
                                  ))}
                                </DataTable.Row>
                              ))}
                            </DataTable>
                          </>
                        ) : (
                          <ActivityIndicator
                            size="small"
                            color={colors.palette.primary500}
                          />
                        )}
                      </List.Accordion>
                    ))}
                  </List.Accordion>
                </Card.Content>
              </Card>

              <Button mode="contained" onPress={exportDatabase} style={$button}>
                Export Database
              </Button>
            </>
          )}
        </ScrollView>
        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={3000}
        >
          {snackbarMessage}
        </Snackbar>
      </Screen>
    );
  }
);

const $root: ViewStyle = {
  flex: 1,
  padding: 16,
};

const $loadingContainer: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
};

const $errorContainer: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  padding: 16,
};

const $errorText: TextStyle = {
  color: colors.error,
  fontSize: 16,
  textAlign: "center",
};

const $card: ViewStyle = {
  marginBottom: 16,
};

const $button: ViewStyle = {
  marginTop: 8,
  marginBottom: 16,
};

export default DatabaseInfoScreen;
