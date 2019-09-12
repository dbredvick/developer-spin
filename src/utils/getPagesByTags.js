import _ from "lodash";

export default function(pages, folderPath, tag) {
    folderPath = folderPath.replace(/^\//, '');
    console.log(pages);
    return _.filter(pages, {relativeDir: folderPath, frontmatter: { tags: [tag] } });
}
