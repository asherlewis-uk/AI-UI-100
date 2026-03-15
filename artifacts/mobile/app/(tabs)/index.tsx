import React, { useState } from "react";
import {
  FlatList,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { CategoryPill } from "@/components/CategoryPill";
import { CharacterCard } from "@/components/CharacterCard";
import { FeaturedBanner } from "@/components/FeaturedBanner";
import Colors from "@/constants/colors";
import { CATEGORIES, CHARACTERS, FEATURED_CHARACTERS, getCharactersByCategory } from "@/data/characters";

export default function DiscoverScreen() {
  const C = Colors.dark;
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const topPadding = Platform.OS === "web" ? 67 : insets.top;
  const displayedChars = getCharactersByCategory(selectedCategory);
  const featured = FEATURED_CHARACTERS.slice(0, 3);

  const numColumns = 2;

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
          <Text style={[styles.title, { color: C.text }]}>Discover</Text>
          <Text style={[styles.subtitle, { color: C.textSecondary }]}>
            Find your perfect companion
          </Text>
        </View>

        {/* Featured carousel */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.featuredList}
          snapToInterval={340}
          decelerationRate="fast"
        >
          {featured.map((char) => (
            <View key={char.id} style={styles.featuredItem}>
              <FeaturedBanner character={char} />
            </View>
          ))}
        </ScrollView>

        {/* Category pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        >
          {CATEGORIES.map((cat) => (
            <CategoryPill
              key={cat}
              label={cat}
              selected={selectedCategory === cat}
              onPress={() => setSelectedCategory(cat)}
            />
          ))}
        </ScrollView>

        {/* Section heading */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: C.text }]}>
            {selectedCategory === "All" ? "All Personas" : selectedCategory}
          </Text>
          <Text style={[styles.sectionCount, { color: C.textMuted }]}>
            {displayedChars.length}
          </Text>
        </View>

        {/* Character grid */}
        <View style={styles.grid}>
          {displayedChars.map((char, i) => (
            <CharacterCard
              key={char.id}
              character={char}
              style={styles.gridItem}
            />
          ))}
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
    paddingBottom: 16,
    gap: 4,
  },
  title: {
    fontSize: 32,
    fontFamily: "Inter_700Bold",
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
  },
  featuredList: {
    paddingHorizontal: 16,
    gap: 12,
    paddingBottom: 4,
  },
  featuredItem: {
    width: 320,
  },
  categoryList: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 12,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Inter_700Bold",
  },
  sectionCount: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 12,
    gap: 10,
  },
  gridItem: {
    width: "47%",
  },
});
