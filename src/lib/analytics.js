const emit = (eventType, eventData) => {
  if (typeof window === 'object' && window._mz && window._mze) {
    window._mz.emit(window._mze[eventType], {
      eventData
    });
  }
};

export const EVENT_TYPES = {
  click: 'CLICK',
  pageView: 'PAGE_VIEW',
}

export const PAGE_TYPES = {
  landing: 'house_points_login',
  schoolChooser: 'house_points_school_chooser',
  housePoints: 'house_points',
};

export const mzClick = (eventData) => {
  emit(EVENT_TYPES.click, eventData);
};

export const mzView = ({ type, school }) => {
  if (!(window && window.TES && window.TES.pageMetadata)) return;
  if (!type) {
    console.error('must specify a page type.');
    return;
  }
  window.TES.pageMetadata.type = type;
  let eventData = {};
  if (school) {
    window.TES.pageMetadata.employerData.employerID = school.tesId;
    eventData = { schoolPointsEmployerId: school.id };
  }
  emit(EVENT_TYPES.pageView, eventData);
};

export const mzUserMetaData = ({ user }) => {
  if (!(window && window.TES && window.TES.userMetadata)) return;
  if (user) {
    window.TES.userMetadata.id = user.sub;
  }
};

