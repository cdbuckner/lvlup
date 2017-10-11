import Dimensions from 'Dimensions';
var {height, width} = Dimensions.get('window');

export default {
    smallGutter: width * 0.02,
    mediumGutter: width * 0.04,
    largeGutter: width * 0.06,

    fillSmallGutters: width * 0.96,
    fillMediumGutters: width * 0.92,
    fillLargeGutters: width * 0.88,

    h1: 24,
    h2: 20,
    h3: 16,
    h4: 12,

    p1: 14,
    p2: 12,
    p3: 10

};
