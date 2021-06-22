class OKMTypes {
  // Common
  static get DEFAULT_WEB_SKIN() { return 'default'; }

  // Used in pagination
  static get NODE_TYPE_FOLDER() { return 1; }
  static get NODE_TYPE_DOCUMENT() { return 2; }
  static get NODE_TYPE_MAIL() { return 3; }
  static get NODE_TYPE_RECORD() { return 4; }
  static get NODE_TYPE_DOCUMENT_AND_EMAIL() {
    return this.NODE_TYPE_DOCUMENT + ',' + this.NODE_TYPE_MAIL;
  }

  static get NODE_TYPE_FOLDER_AND_RECORD() {
    return this.NODE_TYPE_FOLDER + ',' + this.NODE_TYPE_RECORD;
  }

  static get NODE_TYPE_ALL() {
    return this.NODE_TYPE_FOLDER + ',' + this.NODE_TYPE_DOCUMENT + ',' + this.NODE_TYPE_MAIL + ',' +
      this.NODE_TYPE_RECORD;
  }

  // Standard object
  static get NODE_OF_TYPE_FOLDER() { return 'folder'; }
  static get NODE_OF_TYPE_DOCUMENT() { return 'document'; }
  static get NODE_OF_TYPE_MAIL() { return 'mail'; }
  static get NODE_OF_TYPE_RECORD() { return 'record'; }

  // Search type
  static get SEARCH_DOMAIN_DOCUMENT() { return 1; }
  static get SEARCH_DOMAIN_FOLDER() { return 2; }
  static get SEARCH_DOMAIN_MAIL() { return 4; }
  static get SEARCH_DOMAIN_RECORD() { return 8; }
  static get SEARCH_DOMAIN_ALL() {
    return this.SEARCH_DOMAIN_DOCUMENT + this.SEARCH_DOMAIN_FOLDER + this.SEARCH_DOMAIN_MAIL +
      this.SEARCH_DOMAIN_RECORD;
  }

  // Lucene search field
  static get LUCENE_SEARCH_FIELD_UUID() { return 'uuid'; }
  static get LUCENE_SEARCH_FIELD_PARENT() { return 'parent'; }
  static get LUCENE_SEARCH_FIELD_SHARD() { return 'shard'; }
  static get LUCENE_SEARCH_FIELD_CREATED() { return 'created'; }
  static get LUCENE_SEARCH_FIELD_LAST_MODIFIED() { return 'lastModified'; }
  static get LUCENE_SEARCH_FIELD_NAME() { return 'name'; }
  static get LUCENE_SEARCH_FIELD_HAS_RELATIONS() { return 'hasRelations'; }
  static get LUCENE_SEARCH_FIELD_USER_PERMISSION() { return 'userPermission'; }
  static get LUCENE_SEARCH_FIELD_ROLE_PERMISSION() { return 'rolePermission'; }
  static get LUCENE_SEARCH_FIELD_PROMOTED_AS_RECORD() { return 'promotedAsRecord'; }
  static get LUCENE_SEARCH_FIELD_FROM() { return 'from'; }
  static get LUCENE_SEARCH_FIELD_TO() { return 'to'; }
  static get LUCENE_SEARCH_FIELD_SEND_DATE() { return 'sentDate'; }
  static get LUCENE_SEARCH_FIELD_RECEIVED_DATE() { return 'receivedDate'; }
  static get LUCENE_SEARCH_FIELD_SUBJECT() { return 'subject'; }
  static get LUCENE_SEARCH_FIELD_ORIGIN() { return 'origin'; }
  static get LUCENE_SEARCH_FIELD_HAS_ATTACHMENTS() { return 'hasAttachments'; }
  static get LUCENE_SEARCH_FIELD_TEXT_EXTRACTED() { return 'textExtracted'; }
  static get LUCENE_SEARCH_FIELD_LANGUAGE() { return 'language'; }
  static get LUCENE_SEARCH_FIELD_CHECKOUT() { return 'checkedOut'; }
  static get LUCENE_SEARCH_FIELD_ANTIVIRUS_CHECKED() { return 'antivirusChecked'; }
  static get LUCENE_SEARCH_FIELD_AUTHOR() { return 'author'; }
  static get LUCENE_SEARCH_FIELD_MIME_TYPE() { return 'mimeType'; }

  // Permissions
  static get PERMISSION_NONE() { return 0; } // 00000
  static get PERMISSION_READ() { return 1; } // 00001
  static get PERMISSION_WRITE() { return 2; } // 00010
  static get PERMISSION_DELETE() { return 4; } // 00100
  static get PERMISSION_SECURITY() { return 8; } // 01000
  static get PERMISSION_MOVE() { return 16; } // 10000
  static get PERMISSION_ALL_GRANTS() {
    return this.PERMISSION_NONE + this.PERMISSION_READ + this.PERMISSION_WRITE + this.PERMISSION_DELETE +
      this.PERMISSION_SECURITY;
  }

  static get PERMISSION_DOWNLOAD() { return 1024; }
  static get PERMISSION_START_WORKFLOW() { return 2048; }
  static get PERMISSION_COMPACT_HISTORY() { return 4096; }
  static get PERMISSION_METADATA() { return 8192; }

  // Roles
  static get ROLE_USER() { return 'ROLE_USER'; }
  static get ROLE_PUBLIC() { return 'ROLE_PUBLIC'; }

  // Promoted as record
  static get FILE_PLAN_ALL() { return 0; }
  static get FILE_PLAN_PROMOTED_AS_RECORD() { return 1; }
  static get FILE_PLAN_NOT_PROMOTED_AS_RECORD() { return 2; }

  // Thumbnail types
  static get THUMBNAIL_PROPERTIES() { return 'properties'; }
  static get THUMBNAIL_SEARCH() { return 'search'; }
  static get THUMBNAIL_LIGHTBOX() { return 'lightbox'; }

  // Relation types
  static get RELATION_BIDIRECTIONAL() { return 'bidirectional'; }
  static get RELATION_PARENT_CHILD() { return 'parent-child'; }
  static get RELATION_MANY_TO_MANY() { return 'many-to-many'; }

  static get RELATION_NODE_TYPE_FOLDER() { return 'okm:folder'; }
  static get RELATION_NODE_TYPE_DOCUMENT() { return 'okm:document'; }
  static get RELATION_NODE_TYPE_MAIL() { return 'okm:mail'; }
  static get RELATION_NODE_TYPE_RECORD() { return 'okm:record'; }

  // Column names for getChildrenPaginated methods in Node
  static get GET_CHILDREN_PAGINATED_COLUMN_NAME() { return 'name'; }
  static get GET_CHILDREN_PAGINATED_COLUMN_CREATED() { return 'created'; }

  // Column names for getTask methods in Task
  static get GET_TASKS_COLUMN_SUBJECT() { return 'subject'; }
  static get GET_TASKS_COLUMN_LAST_MODIFIED() { return 'lastModified'; }
  static get GET_TASKS_COLUMN_START() { return 'start'; }
  static get GET_TASKS_COLUMN_END() { return 'end'; }
  static get GET_TASKS_COLUMN_PROGRESS() { return 'progress'; }

  // Column names for getChildrenPaginated methods in Mail
  static get GET_MAIL_CHILDREN_PAGINATED_COLUMN_SENT_DATE() { return 'sentDate'; }
  static get GET_MAIL_CHILDREN_PAGINATED_COLUMN_SUBJECT() { return 'subject'; }

  // OCR regognise status
  static get OCR_STATUS_NOT_RECOGNIZED() { return 0; }
  static get OCR_STATUS_RECOGNIZED() { return 1; }
  static get OCR_STATUS_SEVERAL_RECOGNIZED() { return 2; }

  // Column names for getAccount methods in Account
  static get GET_ACCOUNTS_COLUMN_MAIL_USER() { return 'mailUser'; }
  static get GET_ACCOUNTS_COLUMN_ACTIVE() { return 'active'; }

  // MimeTypes
  static get MIME_PDF() { return 'application/pdf'; }
  static get MIME_HTML() { return 'text/html'; }
  static get MIME_TEXT() { return 'text/plain'; }
  static get MIME_MARKDOWN() { return 'text/markdown'; }
  static get MIME_CSV() { return 'text/csv'; }
  static get MIME_RTF() { return 'application/rtf'; }
  static get MIME_ODT() { return 'application/vnd.oasis.opendocument.text'; }
  static get MIME_XLSX() { return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'; }
  static get MIME_DOCX() { return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'; }
  static get MIME_ZIP() { return 'application/zip'; }
  static get MIME_XML() { return 'text/xml'; }

  // Media
  static get MIME_MP3() { return 'audio/mpeg'; }
  static get MIME_WAV() { return 'audio/x-wav'; }
  static get MIME_MP4() { return 'video/mp4'; }
  static get MIME_MPEG() { return 'video/mpeg'; }
  static get MIME_FLV() { return 'video/x-flv'; }
  static get MIME_WMV() { return 'video/x-ms-wmv'; }
  static get MIME_AVI() { return 'video/x-msvideo'; }
  static get MIME_PNG() { return 'image/png'; }
  static get MIME_GIF() { return 'image/gif'; }
  static get MIME_JPEG() { return 'image/jpeg'; }
  static get MIME_BMP() { return 'image/bmp'; }
  static get MIME_TIFF() { return 'image/tiff'; }
  static get MIME_DXF() { return 'image/vnd.dxf'; }
  static get MIME_DWG() { return 'image/vnd.dwg'; }
  static get MIME_DWF() { return 'image/vnd.dwf'; }

  // Code
  static get MIME_SQL() { return 'text/x-sql'; }
  static get MIME_JAVA() { return 'text/x-java'; }
  static get MIME_SCALA() { return 'text/x-scala'; }
  static get MIME_PYTHON() { return 'text/x-python'; }
  static get MIME_GROOVY() { return 'text/x-groovy'; }
  static get MIME_DIFF() { return 'text/x-diff'; }
  static get MIME_PASCAL() { return 'text/x-pascal'; }
  static get MIME_CSHARP() { return 'text/x-csharp'; }
  static get MIME_CPP() { return 'text/x-c++'; }
  static get MIME_APPLESCRIPT() { return 'text/applescript'; }
  static get MIME_SH() { return 'application/x-shellscript'; }
  static get MIME_BSH() { return 'application/x-bsh'; }
  static get MIME_PHP() { return 'application/x-php'; }
  static get MIME_PERL() { return 'application/x-perl'; }
  static get MIME_JAVASCRIPT() { return 'application/javascript'; }
  static get MIME_AS3() { return 'application/x-font-truetype'; }

  // Extensions
  static get EXTENSION_LIVE_EDIT() { return '808e7a42-2e73-470c-ba23-e4c9d5c3a0f4'; }
  static get EXTENSION_HTML_EDITOR() { return '58392af6-2131-413b-b188-1851aa7b651c'; }
  static get EXTENSION_CRYPTOGRAPHY() { return '808e7a42-2e73-470c-ba23-e4c9d5c3a0f4'; }
  static get EXTENSION_DIGITAL_SIGNATURE() { return '93faba30-0c34-11e0-81e0-0800200c9a66'; }
  static get EXTENSION_EXTRA_TAB_WORKSPACE() { return 'c20c69a8-7d6b-4539-9e6b-6f2c11e84168'; }
  static get EXTENSION_CAD_PREVIEW() { return '8e642680-0dcd-4ded-a501-2aa3e53b1286'; }
  static get EXTENSION_WORKFLOW() { return 'fa7f4556-3249-4268-88e0-0dd78a79872a'; }
  static get EXTENSION_EXTRACTED_TEXT() { return '7b08995d-fa1a-4ebf-98f3-a3ef322aa4d5'; }
  static get EXTENSION_EXTERNAL_TAB_DOCUMENT() { return '38a9d032-30b9-470d-93ad-47f5e4f93f97'; }
  static get EXTENSION_EXTERNAL_TAB_FOLDER() { return 'ba5bc2e4-b1de-4cdd-8e63-459fde78867a'; }
  static get EXTENSION_EXTERNAL_TAB_MAIL() { return '80db33ae-a702-41ff-8818-e72daf0ba068'; }
  static get EXTENSION_EXTERNAL_TAB_RECORD() { return '494098d5-0bdc-4e10-a30b-508184a5ee1c'; }
  static get EXTENSION_ACTIVITY_LOG() { return '88ca0d10-39e2-11e0-9207-0800200c9a66'; }
  static get EXTENSION_DIGITAL_SIGNATURE_VIEWER() { return '288cdc63-78e4-434b-94e0-ccbdace1da21'; }

  // Configuration keys
  static get KEY_EXTENSION_EXTERNAL_TAB_DOCUMENT() { return 'extension.external.tab.document'; }
  static get KEY_EXTENSION_EXTERNAL_TAB_FOLDER() { return 'extension.external.tab.folder'; }
  static get KEY_EXTENSION_EXTERNAL_TAB_MAIL() { return 'extension.external.tab.mail'; }
  static get KEY_EXTENSION_EXTERNAL_TAB_RECORD() { return 'extension.external.tab.record'; }

  // Websockets
  static get WEBSOCKET_UI() { return 'UINotification'; }
  static get WEBSOCKET_CRYPTO() { return 'crypto'; }
  // Websockets messages
  static get WEBSOCKET_MESSAGE_REFRESH() { return 'refresh'; }
  static get WEBSOCKET_MESSAGE_END() { return 'end'; }

  // Stamp types
  static get STAMP_TEXT() { return 0; }
  static get STAMP_IMAGE() { return 1; }
  static get STAMP_ALIGN_LEFT() { return 0; }
  static get STAMP_ALIGN_CENTER() { return 1; }
  static get STAMP_ALIGN_RIGHT() { return 2; }
  static get STAMP_LAYER_UNDER_CONTENT() { return 0; }
  static get STAMP_LAYER_OVER_CONTENT() { return 1; }

  // Profile tabs
  static get PROFILE_TAB_BROWSER() { return 'desktop'; }
  static get PROFILE_TAB_SEARCH() { return 'search'; }
  static get PROFILE_TAB_DASHBOARD() { return 'dashboard'; }
  static get PROFILE_TAB_ADMINISTRATION() { return 'administration'; }

  // Exceptions
  static get EXCEPTION_PATH_NOT_FOUND() { return 'PathNotFoundException'; }

  // Date time format
  static get DATE_TIME_FORMAT_NONE() { return 'none'; }
  static get DATE_TIME_FORMAT_HOURS_AND_MINUTES() { return 'hm'; }
  static get DATE_TIME_FORMAT_HOURS() { return 'h'; }

  // License status
  static get LICENSE_EXPIRED_SOFT() { return 'EXPIRED_SOFT'; }
  static get LICENSE_EXPIRED_HARD() { return 'EXPIRED_HARD'; }
  static get LICENSE_ERROR() { return 'ERROR'; }

  // Worfklow button style
  static get WORKFLOW_BUTTON_STYLE_YES() { return 'yes'; }
  static get WORKFLOW_BUTTON_STYLE_NO() { return 'no'; }
  static get WORKFLOW_BUTTON_STYLE_ADD() { return 'add'; }
  static get WORKFLOW_BUTTON_STYLE_DELETE() { return 'delete'; }
  static get WORKFLOW_BUTTON_STYLE_DOWNLOAD() { return 'download'; }
  static get WORKFLOW_BUTTON_STYLE_DOWNLOAD_ZIP() { return 'downloadZip'; }
  static get WORKFLOW_BUTTON_STYLE_HOME() { return 'home'; }
  static get WORKFLOW_BUTTON_STYLE_VIEW() { return 'view'; }
  static get WORKFLOW_BUTTON_STYLE_CHANGE() { return 'change'; }
  static get WORKFLOW_BUTTON_STYLE_COMPACT() { return 'compact'; }
  static get WORKFLOW_BUTTON_STYLE_CLEAN() { return 'clean'; }
  static get WORKFLOW_BUTTON_STYLE_SEARCH() { return 'search'; }
  static get WORKFLOW_BUTTON_STYLE_SAVE() { return 'save'; }
  static get WORKFLOW_BUTTON_STYLE_COMMENT() { return 'comment'; }
}

export default OKMTypes;
