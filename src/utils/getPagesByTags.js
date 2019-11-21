import _ from "lodash";

export default function (pages, folderPath, tags) {
    folderPath = folderPath.replace(/^\//, '');
    return _.filter(pages, { relativeDir: folderPath, frontmatter: { tags: [...tags] } });
}