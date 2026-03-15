import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import Colors, { spectral } from "@/constants/colors";
import { useChats } from "@/context/ChatsContext";

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
        <View style={styles.header}>
          <Text style={[styles.title, { color: C.text }]}>Profile</Text>
          <Pressable
            onPress={() => router.push("/settings")}
            style={({ pressed }) => [
              styles.gearBtn,
              { opacity: pressed ? 0.6 : 1 },
            ]}
          >
            <Feather name="settings" size={22} color={C.teal} />
          </Pressable>
        </View>

        <View style={styles.profileSection}>
          <LinearGradient
            colors={[spectral.green, spectral.blue, spectral.violet]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.avatarGradient}
          >
            <Feather name="user" size={32} color="#fff" />
          </LinearGradient>
          <Text style={[styles.userName, { color: C.text }]}>You</Text>
          <Text style={[styles.userHandle, { color: C.tealDim }]}>
            @explorer
          </Text>
        </View>

        <View style={[styles.statsRow, { backgroundColor: C.card }]}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: C.text }]}>
              {conversations.length}
            </Text>
            <Text style={[styles.statLabel, { color: C.tealMuted }]}>
              Personas
            </Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: C.border }]} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: C.text }]}>
              {totalMessages}
            </Text>
            <Text style={[styles.statLabel, { color: C.tealMuted }]}>
              Messages
            </Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: C.border }]} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: C.text }]}>∞</Text>
            <Text style={[styles.statLabel, { color: C.tealMuted }]}>Free</Text>
          </View>
        </View>

        <Pressable
          onPress={() => router.push("/settings")}
          style={({ pressed }) => [
            styles.settingsBtn,
            {
              backgroundColor: C.card,
              borderColor: C.tealSubtle,
              opacity: pressed ? 0.85 : 1,
            },
          ]}
        >
          <Feather name="sliders" size={18} color={C.teal} />
          <Text style={[styles.settingsBtnText, { color: C.text }]}>
            Settings & Preferences
          </Text>
          <Feather name="chevron-right" size={16} color={C.tealMuted} />
        </Pressable>

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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontFamily: "Inter_700Bold",
  },
  gearBtn: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
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
  settingsBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    gap: 12,
  },
  settingsBtnText: {
    flex: 1,
    fontSize: 15,
    fontFamily: "Inter_500Medium",
  },
});
