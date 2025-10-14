import 'package:flutter/material.dart';
import 'theme/app_theme.dart';
import 'screens/splash_screen.dart';

void main() {
  runApp(const KonvoApp());
}

class KonvoApp extends StatelessWidget {
  const KonvoApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Konvo',
      theme: AppTheme.lightTheme,
      darkTheme: AppTheme.darkTheme,
      themeMode: ThemeMode.dark,
      debugShowCheckedModeBanner: false,
      home: const SplashScreen(),
    );
  }
}