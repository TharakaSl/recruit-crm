import { mergeStyleSets } from "@uifabric/merge-styles";

export interface IComponentClassNames {
  footerDiv: string;
  copyrightbl: string;
  conditionLink: string;
}
export const getClassNames = (): IComponentClassNames => {
  return mergeStyleSets({
    footerDiv: {
      backgroundColor: "#ffffff",
      height: 30,
      position: "fixed",
      bottom: 0,
      left: 0
    },
    copyrightbl: {
      fontFamily:
        '"wf_segoe-ui_normal", "Segoe UI", "Segoe WP", Tahoma, Arial,sans-serif',
      fontWeight: 600,
      fontSize: 10,
      paddingLeft: 5,
      paddingRight: 5,
      paddingTop: 0
    },
    conditionLink: {
      fontFamily:
        '"wf_segoe-ui_normal", "Segoe UI", "Segoe WP", Tahoma, Arial,sans-serif',
      fontWeight: 600,
      fontSize: 10,
      paddingLeft: 5,
      paddingRight: 5,
      paddingTop: 0,
      color: "#FF2E7E"
    }
  });
};