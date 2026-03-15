import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import Colors from "@/constants/colors";
import { useChats } from "@/context/ChatsContext";

type SettingRowProps = {
  icon: string;
  label: string;
  value?: string;
  onPress?: () => void;
  destructive?: boolean;
};

function SettingRow({ icon, label, value, onPress, destructive }: SettingRowProps) {
  const C = Colors.dark;
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.settingRow,
        { opacity: pressed && onPress ? 0.7 : 1 },
      ]}
    >
      <View style={[styles.settingIcon, { backgroundColor: C.card }]}>
        <Feather
          name={icon as any}
          size={16}
          color={destructive ? C.error : C.textSecondary}
        />
      </View>
      <Text
        style={[
          styles.settingLabel,
          { color: destructive ? C.error : C.text },
        ]}
      >
        {label}
      </Text>
      <View style={styles.settingRight}>
        {value && (
          <Text style={[styles.settingValue, { color: C.textMuted }]}>{value}</Text>
        )}
        {onPress && !destructive && (
          <Feather name="chevron-right" size={16} color={C.textMuted} />
        )}
      </View>
    </Pressable>
  );
}

export default function ProfileScreen() {
  const C = Colors.dark;
  const { conversations } = useChats();

  const topPadding = Platform.OS === "web" ? 67 : 0;
  const totalMessages = conversations.reduce(
    (sum, c) => sum + c.messages.length,
    0
  );

  return (
    <View style={[styles.container, { backgroundColor: C.background }]}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: Platform.OS === "web" ? topPadding : 0 },
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: C.text }]}>Profile</Text>
        </View>

        {/* Avatar & name */}
        <View style={styles.profileSection}>
          <LinearGradient
            colors={["#7C3AED", "#A855F7"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.avatarGradient}
          >
            <Feather name="user" size={32} color="#fff" />
          </LinearGradient>
          <Text style={[styles.userName, { color: C.text }]}>You</Text>
          <Text style={[styles.userHandle, { color: C.textMuted }]}>@explorer</Text>
        </View>

        {/* Stats */}
        <View style={[styles.statsRow, { backgroundColor: C.card }]}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: C.text }]}>{conversations.length}</Text>
            <Text style={[styles.statLabel, { color: C.textMuted }]}>Personas</Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: C.border }]} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: C.text }]}>{totalMessages}</Text>
            <Text style={[styles.statLabel, { color: C.textMuted }]}>Messages</Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: C.border }]} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: C.text }]}>∞</Text>
            <Text style={[styles.statLabel, { color: C.textMuted }]}>Free</Text>
          </View>
        </View>

        {/* Settings */}
        <Text style={[styles.sectionHeader, { color: C.textMuted }]}>PREFERENCES</Text>
        <View style={[styles.settingsGroup, { backgroundColor: C.card }]}>
          <SettingRow icon="moon" label="Dark Mode" value="Always" />
          <View style={[styles.rowDivider, { backgroundColor: C.border }]} />
          <SettingRow icon="bell" label="Notifications" value="On" />
          <View style={[styles.rowDivider, { backgroundColor: C.border }]} />
          <SettingRow icon="globe" label="Language" value="English" />
        </View>

        <Text style={[styles.sectionHeader, { color: C.textMuted }]}>ABOUT</Text>
        <View style={[styles.settingsGroup, { backgroundColor: C.card }]}>
          <SettingRow icon="info" label="Version" value="1.0.0" />
          <View style={[styles.rowDivider, { backgroundColor: C.border }]} />
          <SettingRow icon="shield" label="Privacy Policy" onPress={() => {}} />
          <View style={[styles.rowDivider, { backgroundColor: C.border }]} />
          <SettingRow icon="file-text" label="Terms of Service" onPress={() => {}} />
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 4,
  },
  title: {
    fontSize: 32,
    fontFamily: "Inter_700Bold",
  },
  profileSection: {
    alignItems: "center",
    paddingVertical: 28,
    gap: 8,
  },
  avatarGradient: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  userName: {
    fontSize: 22,
    fontFamily: "Inter_700Bold",
    marginTop: 4,
  },
  userHandle: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
  },
  statsRow: {
    flexDirection: "row",
    marginHorizontal: 16,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 24,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 18,
    gap: 4,
  },
  statValue: {
    fontSize: 22,
    fontFamily: "Inter_700Bold",
  },
  statLabel: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
  },
  statDivider: {
    width: 1,
    marginVertical: 12,
  },
  sectionHeader: {
    fontSize: 11,
    fontFamily: "Inter_600SemiBold",
    letterSpacing: 1.2,
    paddingHorizontal: 20,
    paddingBottom: 8,
    paddingTop: 4,
  },
  settingsGroup: {
    marginHorizontal: 16,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 24,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  settingIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  settingLabel: {
    flex: 1,
    fontSize: 15,
    fontFamily: "Inter_500Medium",
  },
  settingRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  settingValue: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
  },
  rowDivider: {
    height: StyleSheet.hairlineWidth,
    marginLeft: 60,
  },
});
