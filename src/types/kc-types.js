import OKMTypes from '@/ws/okm-types';

class KCTypes {
  // Global
  static get TRANSLATION_MODULE_ID() { return 'kcenter'; }

  // Repository
  static get NODE_ROOT() { return '/okm:root'; }
  static get NODE_TEMPLATES() { return '/okm:templates'; }
  static get NODE_PERSONAL() { return '/okm:personal'; }
  static get NODE_MAIL() { return '/okm:mail'; }
  static get NODE_TRASH() { return '/okm:trash'; }
  static get NODE_CATEGORIES() { return '/okm:categories'; }
  static get NODE_HOME() { return '/'; }

  // ORDERING FIELDS
  static get BROWSER_ORDER_BY_NAME() { return OKMTypes.GET_CHILDREN_PAGINATED_COLUMN_NAME; }
  static get BROWSER_ORDER_BY_CREATED() { return OKMTypes.GET_CHILDREN_PAGINATED_COLUMN_CREATED; }
  static get TASK_ORDER_BY_COLUMN_SUBJECT() { return OKMTypes.GET_TASKS_COLUMN_SUBJECT; }
  static get TASK_ORDER_BY_COLUMN_LAST_MODIFIED() { return OKMTypes.GET_TASKS_COLUMN_LAST_MODIFIED; }
  static get TASK_ORDER_BY_COLUMN_START() { return OKMTypes.GET_TASKS_COLUMN_START; }
  static get TASK_ORDER_BY_COLUMN_END() { return OKMTypes.GET_TASKS_COLUMN_END; }
  static get TASK_ORDER_BY_COLUMN_PROGRESS() { return OKMTypes.GET_TASKS_COLUMN_PROGRESS; }
  static get MAIL_ORDER_BY_SEND_DATE() { return OKMTypes.GET_MAIL_CHILDREN_PAGINATED_COLUMN_SENT_DATE; }
  static get MAIL_ORDER_BY_SUBJECT() { return OKMTypes.GET_MAIL_CHILDREN_PAGINATED_COLUMN_SUBJECT; }

  // MAIL ATTACHMENT FILTERING VALUES
  static get MAIL_ATTACHMENTS_WITHOUT_FILTERING() { return ''; }
  static get MAIL_ATTACHMENTS_FILTERING_WITH_ATTACHMENTS() { return 'T'; }
  static get MAIL_ATTACHMENTS_FILTERING_WITHOUT_ATTACHMENTS() { return 'F'; }

  // Default value '1,2,3,4' for node type list
  static get SEARCH_FILTERED_BY_NODE_TYPE_LIST() {
    return OKMTypes.NODE_TYPE_FOLDER + ',' + OKMTypes.NODE_TYPE_DOCUMENT + ',' +
      OKMTypes.NODE_TYPE_MAIL + ',' + OKMTypes.NODE_TYPE_RECORD;
  }

  static get SEARCH_FILTERED_BY_FOLDERS_AND_RECORDS_NODE_TYPE_LIST() {
    return OKMTypes.NODE_TYPE_FOLDER + ',' + OKMTypes.NODE_TYPE_RECORD;
  }

  // UI
  static get MAX_PAGINATION_VISIBLE_PAGES() { return 5; } // should be odd number for better pagination look and feel
  static get SET_FOCUS_DELAY() { return 200; } // should be odd number for better pagination look and feel
  static get DEFAULT_PAGE_LIST() { return [10, 25, 50, 100]; } // only will be used when pagination is wrongly set in the profile

  // Exceptions
  static get PATH_NOT_FOUND_EXCEPTION() { return 'PathNotFoundException'; }
}

export default KCTypes;
