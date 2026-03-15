import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Colors from "@/constants/colors";
import { useSettings } from "@/context/SettingsContext";

export default function CustomInstructionsScreen() {
  const C = Colors.dark;
  const insets = useSafeAreaInsets();
  const { settings, updateCustomInstructions } = useSettings();

  const [aboutUser, setAboutUser] = useState(
    settings.customInstructions.aboutUser
  );
  const [responseStyle, setResponseStyle] = useState(
    settings.customInstructions.responseStyle
  );

  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleAutosave = (newAbout: string, newStyle: string) => {
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      updateCustomInstructions({
        aboutUser: newAbout,
        responseStyle: newStyle,
      });
    }, 500);
  };

  useEffect(() => {
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, []);

  const handleAboutChange = (text: string) => {
    setAboutUser(text);
    scheduleAutosave(text, responseStyle);
  };

  const handleStyleChange = (text: string) => {
    setResponseStyle(text);
    scheduleAutosave(aboutUser, text);
  };

  const handleBack = () => {
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    updateCustomInstructions({ aboutUser, responseStyle });
    router.back();
  };

  const topPad = Platform.OS === "web" ? 67 : insets.top;

  return (
    <View style={[styles.container, { backgroundColor: C.background }]}>
      <View
        style={[
          styles.header,
          {
            paddingTop: topPad + 8,
            borderBottomColor: C.border,
          },
        ]}
      >
        <Pressable onPress={handleBack} style={styles.backBtn}>
          <Feather name="arrow-left" size={22} color={C.text} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: C.text }]}>
          Custom Instructions
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: C.text }]}>
            What would you like the AI to know about you?
          </Text>
          <Text style={[styles.sectionHint, { color: C.tealMuted }]}>
            This context is shared with every persona you chat with.
          </Text>
          <View
            style={[
              styles.inputWrapper,
              { backgroundColor: C.card, borderColor: C.border },
            ]}
          >
            <TextInput
              value={aboutUser}
              onChangeText={handleAboutChange}
              placeholder="e.g. I'm a graduate student studying philosophy. I enjoy deep conversations about ethics and the meaning of life."
              placeholderTextColor={C.textMuted}
              style={[styles.textInput, { color: C.text }]}
              multiline
              textAlignVertical="top"
              maxLength={1500}
            />
          </View>
          <Text style={[styles.charCount, { color: C.textMuted }]}>
            {aboutUser.length}/1500
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: C.text }]}>
            How would you like the AI to respond?
          </Text>
          <Text style={[styles.sectionHint, { color: C.tealMuted }]}>
            Set preferences for tone, format, and detail level.
          </Text>
          <View
            style={[
              styles.inputWrapper,
              { backgroundColor: C.card, borderColor: C.border },
            ]}
          >
            <TextInput
              value={responseStyle}
              onChangeText={handleStyleChange}
              placeholder="e.g. Be concise and direct. Use examples when explaining complex topics. Avoid overly formal language."
              placeholderTextColor={C.textMuted}
              style={[styles.textInput, { color: C.text }]}
              multiline
              textAlignVertical="top"
              maxLength={1500}
            />
          </View>
          <Text style={[styles.charCount, { color: C.textMuted }]}>
            {responseStyle.length}/1500
          </Text>
        </View>

        <View style={[styles.infoBox, { backgroundColor: C.card }]}>
          <Feather name="info" size={14} color={C.teal} />
          <Text style={[styles.infoText, { color: C.textSecondary }]}>
            Custom instructions are automatically included in every
            conversation. Changes apply to new messages only.
          </Text>
        </View>

        <View style={{ height: 60 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 17,
    fontFamily: "Inter_600SemiBold",
  },
  headerSpacer: {
    width: 40,
  },
  scrollContent: {
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  section: {
    marginTop: 24,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
    lineHeight: 22,
  },
  sectionHint: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    lineHeight: 18,
    marginBottom: 4,
  },
  inputWrapper: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 12,
  },
  textInput: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    lineHeight: 20,
    minHeight: 120,
  },
  charCount: {
    fontSize: 11,
    fontFamily: "Inter_400Regular",
    textAlign: "right",
  },
  infoBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    marginTop: 24,
    padding: 14,
    borderRadius: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    lineHeight: 18,
  },
});
