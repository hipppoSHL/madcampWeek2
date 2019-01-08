package com.rd.pageindicatorview.home;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import androidx.annotation.NonNull;
import androidx.viewpager.widget.ViewPager;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.FrameLayout;
import android.widget.Toast;

import com.rd.PageIndicatorView;
import com.rd.pageindicatorview.base.BaseActivity;
import com.rd.pageindicatorview.customize.CustomizeActivity;
import com.rd.pageindicatorview.data.Customization;
import com.rd.pageindicatorview.sample.R;

import java.util.ArrayList;
import java.util.List;


public class HomeActivity extends BaseActivity {
    private static final String ENTRY_URL = "file:///android_asset/bubble_ui/index.html";

    private PageIndicatorView pageIndicatorView;
    private Customization customization;
    private FrameLayout container;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.ac_home);
        customization = new Customization();

        initToolbar();
        initViews();
    }



    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent intent) {
        boolean customization = requestCode == CustomizeActivity.EXTRAS_CUSTOMIZATION_REQUEST_CODE && resultCode == RESULT_OK;
        if (customization && intent != null) {
            this.customization = intent.getParcelableExtra(CustomizeActivity.EXTRAS_CUSTOMIZATION);
            updateIndicator();
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.menu_customize, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case R.id.actionCustomize:
                CustomizeActivity.start(this, customization);
                return true;

            default:
                return super.onOptionsItemSelected(item);
        }
    }

    @SuppressWarnings("ConstantConditions")
    private void initViews() {
        HomeAdapter adapter = new HomeAdapter();
        adapter.setData(createPageList());

        final ViewPager pager = findViewById(R.id.viewPager);
        pager.setAdapter(adapter);

        pageIndicatorView = findViewById(R.id.pageIndicatorView);
    }

    @NonNull
    private List<View> createPageList() {
        List<View> pageList = new ArrayList<>();
        pageList.add(createWebView("file:///android_asset/bubble_ui/index.html"));
        pageList.add(createPageView(R.color.google_red));
        pageList.add(createPageView(R.color.google_blue));


        return pageList;
    }

    @NonNull
    private View createPageView(int color) {
        View view = new View(this);
        view.setBackgroundColor(getResources().getColor(color));
        return view;
    }

    private View createWebView(String url) {
        WebView webView = new WebView(this);
        webView.setWebViewClient(new WebViewClient());
        webView.setWebChromeClient(new WebChromeClient());
        webView.addJavascriptInterface(new Object() {
            @JavascriptInterface
            public void justDoItCall(String keyword) {
                String tel = "tel:" + keyword;
//                Toast.makeText(HomeActivity.this, "Keyword is " + keyword, Toast.LENGTH_LONG).show();
                startActivity(new Intent("android.intent.action.DIAL", Uri.parse(tel)));
            }
            @JavascriptInterface
            public void justDoItMessage(String keyword) {
                String tel = "tel:" + keyword;
                Intent sendIntent = new Intent(Intent.ACTION_SENDTO);
                sendIntent.addCategory(Intent.CATEGORY_DEFAULT);
                sendIntent.setType("vnd.android-dir/mms-sms");
                sendIntent.setData(Uri.parse("sms:" + tel));
                startActivity(sendIntent);
            }
        }, "Zeany");
        WebSettings webSettings = webView.getSettings();
        webSettings.setCacheMode(WebSettings.LOAD_NO_CACHE);


        webSettings.setJavaScriptEnabled(true);
        webView.loadUrl(url);
        return webView;
    }

    private void updateIndicator() {
        if (customization == null) {
            return;
        }

        pageIndicatorView.setAnimationType(customization.getAnimationType());
        pageIndicatorView.setOrientation(customization.getOrientation());
        pageIndicatorView.setRtlMode(customization.getRtlMode());
        pageIndicatorView.setInteractiveAnimation(customization.isInteractiveAnimation());
        pageIndicatorView.setAutoVisibility(customization.isAutoVisibility());
        pageIndicatorView.setFadeOnIdle(customization.isFadeOnIdle());
    }
}
