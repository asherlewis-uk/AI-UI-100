import React, { useMemo, useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { CharacterCard } from "@/components/CharacterCard";
import { SearchBar } from "@/components/SearchBar";
import Colors from "@/constants/colors";
import { CATEGORIES, CHARACTERS } from "@/data/characters";

export default function SearchScreen() {
  const C = Colors.dark;
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState("");

  const topPadding = Platform.OS === "web" ? 67 : 0;

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return CHARACTERS.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.tagline.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q)) ||
        c.category.toLowerCase().includes(q)
    );
  }, [query]);

  const hasQuery = query.trim().length > 0;

  return (
    <View style={[styles.container, { backgroundColor: C.background }]}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: Platform.OS === "web" ? topPadding : 0 },
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: C.text }]}>Search</Text>
          <View style={styles.searchBarWrap}>
            <SearchBar
              value={query}
              onChangeText={setQuery}
              placeholder="Search personas, genres..."
            />
          </View>
        </View>

        {!hasQuery ? (
          <>
            {/* Category grid */}
            <Text style={[styles.sectionTitle, { color: C.text }]}>Browse by category</Text>
            <View style={styles.categoryGrid}>
              {CATEGORIES.filter((c) => c !== "All" && c !== "Featured").map((cat, i) => {
                const colors = [
                  ["#7C3AED", "#A855F7"],
                  ["#059669", "#10B981"],
                  ["#DC2626", "#EF4444"],
                  ["#0E7490", "#06B6D4"],
                  ["#D97706", "#F59E0B"],
                  ["#DB2777", "#F472B6"],
                  ["#1D4ED8", "#3B82F6"],
                ];
                const colorPair = colors[i % colors.length];
                return (
                  <View
                    key={cat}
                    style={[
                      styles.categoryTile,
                      {
                        backgroundColor: colorPair[0] + "33",
                        borderColor: colorPair[0] + "66",
                      },
                    ]}
                  >
                    <Text style={[styles.categoryTileText, { color: colorPair[1] }]}>{cat}</Text>
                  </View>
                );
              })}
            </View>
          </>
        ) : results.length === 0 ? (
          <View style={styles.noResults}>
            <Text style={[styles.noResultsTitle, { color: C.text }]}>No results</Text>
            <Text style={[styles.noResultsText, { color: C.textSecondary }]}>
              Try a different name, genre, or personality type
            </Text>
          </View>
        ) : (
          <>
            <Text style={[styles.resultsCount, { color: C.textMuted }]}>
              {results.length} result{results.length !== 1 ? "s" : ""}
            </Text>
            <View style={styles.grid}>
              {results.map((char) => (
                <CharacterCard key={char.id} character={char} style={styles.gridItem} />
              ))}
            </View>
          </>
        )}

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
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 12,
    gap: 12,
  },
  title: {
    fontSize: 32,
    fontFamily: "Inter_700Bold",
    paddingHorizontal: 4,
  },
  searchBarWrap: {},
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Inter_700Bold",
    paddingHorizontal: 20,
    paddingBottom: 12,
    paddingTop: 4,
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 12,
    gap: 10,
  },
  categoryTile: {
    width: "47%",
    paddingVertical: 20,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  categoryTileText: {
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
  },
  resultsCount: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    paddingHorizontal: 20,
    paddingBottom: 10,
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
  noResults: {
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 40,
    gap: 8,
  },
  noResultsTitle: {
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
  },
  noResultsText: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
  },
});
