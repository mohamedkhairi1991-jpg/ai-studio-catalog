import 'package:flutter/widgets.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:pharmaconnect_l10n/pharmaconnect_l10n.dart';

void main() {
  test('Only English is supported', () {
    expect(AppLocalizations.supportedLocales, const <Locale>[Locale('en')]);
  });
}
