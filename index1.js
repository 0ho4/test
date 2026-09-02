import { React } from "@vendetta/metro/common";
import { registerPlugin, storage } from "@vendetta/plugin";
import { findByStoreName, findByProps } from "@vendetta/metro";
import { patcher } from "@vendetta";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { showConfirmationAlert } from "@vendetta/ui/alerts";
import { HeaderButton } from "@vendetta/ui";

// البادجات الرسمية باستخدام Assets الداخلية للتطبيق بدلاً من روابط CDN المكسورة
const OFFICIAL_BADGES = [
  { id: "staff", name: "Discord Staff", asset: "badge_staff" },
  { id: "partner", name: "Partnered Server Owner", asset: "badge_partner" },
  { id: "hypesquad_events", name: "HypeSquad Events", asset: "badge_hypesquad" },
  { id: "bravery", name: "HypeSquad Bravery", asset: "badge_house_1" },
  { id: "brilliance", name: "HypeSquad Brilliance", asset: "badge_house_2" },
  { id: "balance", name: "HypeSquad Balance", asset: "badge_house_3" },
  { id: "bug_hunter_1", name: "Bug Hunter Level 1", asset: "badge_bug_hunter_1" },
  { id: "bug_hunter_2", name: "Bug Hunter Level 2", asset: "badge_bug_hunter_2" },
  { id: "early_supporter", name: "Early Supporter", asset: "badge_early_supporter" },
  { id: "active_developer", name: "Active Developer", asset: "badge_active_developer" },
  { id: "nitro", name: "Nitro Subscriber", asset: "badge_nitro" },
  { id: "boost", name: "Server Booster", asset: "badge_bot_commander" }
];

let unpatches = [];

export default {
  onLoad: () => {
    try {
      HeaderButton.add({
        id: "nightcord-pencil-btn",
        icon: "pencil",
        position: "right",
        onPress: () => {
          showConfirmationAlert({
            title: "Nightcord Profile Editor",
            content: "تم تحديث الأيقونات والبادجات من ذاكرة التطبيق الأصلية.",
            confirmText: "حفظ",
            cancelText: "إلغاء",
            onConfirm: () => {
              const UserStore = findByStoreName("UserStore");
              if (UserStore) UserStore.emitChange();
            }
          });
        }
      });

      const UserProfileStore = findByStoreName("UserProfileStore");
      const UserStore = findByStoreName("UserStore");

      if (UserProfileStore) {
        unpatches.push(
          patcher.after(UserProfileStore, "getUserProfile", (args, profile) => {
            if (!profile) return profile;

            // بناء البادجات بأيادي assets الرسمية لضمان ظهور الصور فوراً
            profile.badges = OFFICIAL_BADGES.map(b => ({
              id: b.id,
              description: b.name,
              icon: getAssetIDByName(b.asset) || b.asset
            }));

            return profile;
          })
        );
      }

      if (UserStore) UserStore.emitChange();

    } catch (err) {
      console.error("[Nightcord] Asset error:", err);
    }
  },

  onUnload: () => {
    try {
      HeaderButton.remove("nightcord-pencil-btn");
      for (const unpatch of unpatches) unpatch();
      unpatches = [];
    } catch (err) {
      console.error("[Nightcord] Unload error:", err);
    }
  }
};