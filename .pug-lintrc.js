// Rules description https://github.com/pugjs/pug-lint/blob/master/docs/rules.md

module.exports = {
  disallowAttributeConcatenation: null,
  disallowAttributeInterpolation: true,
  disallowAttributeTemplateString: true,
  disallowBlockExpansion: true,
  disallowClassAttributeWithStaticValue: true,
  disallowClassLiteralsBeforeAttributes: true,
  disallowClassLiteralsBeforeIdLiterals: true,
  disallowClassLiterals: null,
  disallowDuplicateAttributes: true,
  disallowHtmlText: true,
  disallowIdAttributeWithStaticValue: null,
  disallowIdLiteralsBeforeAttributes: null,
  disallowIdLiterals: null,
  disallowLegacyMixinCall: true,
  disallowMultipleLineBreaks: true,
  disallowSpaceAfterCodeOperator: null,
  disallowSpacesInsideAttributeBrackets: true,
  disallowSpecificAttributes: null,
  disallowSpecificTags: null,
  disallowStringConcatenation: true,
  disallowStringInterpolation: null,
  disallowTagInterpolation: true,
  disallowTemplateString: null,
  disallowTrailingSpaces: null,
  maximumLineLength: 120,
  maximumNumberOfLines: 100,
  requireClassLiteralsBeforeAttributes: true,
  requireClassLiteralsBeforeIdLiterals: null,
  requireIdLiteralsBeforeAttributes: true,
  requireLineFeedAtFileEnd: null,
  requireLowerCaseAttributes: true,
  requireLowerCaseTags: true,
  requireSpaceAfterCodeOperator: true,
  requireSpacesInsideAttributeBrackets: null,
  requireSpecificAttributes: [
    { form: 'action' },
    { img: 'alt' },
    { input: 'type' },
    { 'input[type=submit]': 'value' }
  ],
  requireStrictEqualityOperators: true,
  validateAttributeQuoteMarks: '"',
  validateAttributeSeparator: { separator: ', ', multiLineSeparator: '\n  ' },
  validateDivTags: true,
  validateExtensions: true,
  validateIndentation: 2,
  validateLineBreaks: 'LF',
  validateSelfClosingTags: true,
  validateTemplateString: true
};
