import {
  FlatList,
  Image,
  LayoutAnimation,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "../../constants";

export default function Faq() {
  const Data = {
    title: "FAQ's",
    rows: [
      {
        id: "1",
        title: "Lorem ipsum dolor sit amet,",
        isExpanded: false,
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed tempor sem. Aenean vel turpis feugiat, ultricies metus at, consequat velit. Curabitur est nibh, varius in tellus nec, mattis pulvinar metus. In maximus cursus lorem, nec laoreet velit eleifend vel. Ut aliquet mauris tortor, sed egestas libero interdum vitae. Fusce sed commodo purus, at tempus turpis.`,
      },
      {
        id: "2",
        title: "Nunc maximus, magna at ultricies elementum",
        isExpanded: false,
        content:
          "Nunc maximus, magna at ultricies elementum, risus turpis vulputate quam, vitae convallis ex tortor sed dolor.",
      },
      {
        id: "3",
        title: "Curabitur laoreet, mauris vel blandit fringilla",
        isExpanded: false,
        content: `Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc, ac sagittis leo elit vel lorem. Fusce tempor lacus ut libero posuere viverra. Nunc velit dolor, tincidunt at varius vel, laoreet vel quam. Sed dolor urna, lobortis in arcu auctor, tincidunt mattis ante. Vivamus venenatis ultricies nibh in volutpat. Cras eu metus quis leo vestibulum feugiat nec sagittis lacus.Mauris vulputate arcu sed massa euismod dignissim. `,
      },
      {
        id: "4",
        title: "Lorem ipsum dolor sit amet,",
        isExpanded: false,
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed tempor sem. Aenean vel turpis feugiat, ultricies metus at, consequat velit. Curabitur est nibh, varius in tellus nec, mattis pulvinar metus. In maximus cursus lorem, nec laoreet velit eleifend vel. Ut aliquet mauris tortor, sed egestas libero interdum vitae. Fusce sed commodo purus, at tempus turpis.`,
      },
      {
        id: "5",
        title: "Nunc maximus, magna at ultricies elementum",
        isExpanded: false,
        content:
          "Nunc maximus, magna at ultricies elementum, risus turpis vulputate quam, vitae convallis ex tortor sed dolor.",
      },
      {
        id: "6",
        title: "Curabitur laoreet, mauris vel blandit fringilla",
        isExpanded: false,
        content: `Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc, ac sagittis leo elit vel lorem. Fusce tempor lacus ut libero posuere viverra. Nunc velit dolor, tincidunt at varius vel, laoreet vel quam. Sed dolor urna, lobortis in arcu auctor, tincidunt mattis ante. Vivamus venenatis ultricies nibh in volutpat. Cras eu metus quis leo vestibulum feugiat nec sagittis lacus.Mauris vulputate arcu sed massa euismod dignissim. `,
      },
    ],
  };

  const [expanded, setexpanded] = useState();
  const [data, setData] = useState(Data);

  const onChangeLayout = (title) => {
    setexpanded(title);
  };

  useEffect(() => {}, [expanded]);

  const renderFaqItem = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.card,
          { padding: 15, borderWidth: item.isExpanded ? 2 : 0 },
        ]}
        onPress={() => {
          if (item.isExpanded === false) {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
            onChangeLayout(item.title);
            data.rows.map((childItem) => {
              childItem.isExpanded = false;
            });
            item.isExpanded = true;
          } else {
            let temp = [];
            data.rows.map((i) => {
              if (i.id === item.id) {
                i.isExpanded = false;
                LayoutAnimation.configureNext(
                  LayoutAnimation.Presets.easeInEaseOut
                );
                onChangeLayout(item.title);
                temp.push(i);
              } else {
                temp.push(i);
              }
            });
            setData({ title: "FAQ's", rows: temp });
          }
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: item.isExpanded
                ? COLORS.normal.black
                : COLORS.normal.brownGrey,
              flex: 1,
            }}
          >
            {item.title}
          </Text>
          <Image
            //   source={item.isExpanded ? Images.iconDash : Images.iconArrowDown}
            style={{ height: 15, width: 15, resizeMode: "contain" }}
          />
        </View>
        {item.isExpanded && (
          <View style={{ height: expanded === item.title ? null : 0 }}>
            <Text style={{ fontSize: 14, color: COLORS.normal.brownGrey }}>
              {item.content}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data.rows}
        showsVerticalScrollIndicator={false}
        keyExtractor={(data) => data.id}
        renderItem={renderFaqItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.normal.white,
  },
  iconBack: {
    height: 20,
    width: 20,
    resizeMode: "contain",
  },
  card: {
    backgroundColor: COLORS.normal.white,
    borderRadius: 10,
    padding: 20,
    margin: 10,
    borderColor: COLORS.primary.cherry,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
});
