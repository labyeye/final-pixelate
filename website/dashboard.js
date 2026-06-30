/**
 * Pixelate Nest — Admin Dashboard JS
 * Covers: dynamic fields, tag inputs, repeaters, file previews,
 *         video embed preview, color pickers, char counter, validation.
 *
 * ─────────────────────────────────────────────────────────────────
 * EXPECTED MONGODB DOCUMENT SHAPE (base fields common to all types)
 * ─────────────────────────────────────────────────────────────────
 * {
 *   project_title:      String,
 *   project_type:       "web_development" | "app_development" |
 *                       "software_development" | "video_editing" |
 *                       "digital_marketing" | "uiux_design" | "branding",
 *   client_name:        String,
 *   year:               Number,
 *   location:           String,
 *   short_description:  String,          // max 200 chars
 *   hero_image:         String,          // Cloudinary URL after upload
 *   live_url:           String,
 *   status:             "draft" | "published" | "archived",
 *   seo_meta_title:     String,
 *   seo_meta_desc:      String,
 *   created_at:         Date,
 *   updated_at:         Date,
 *
 *   // ── Web Development extra fields ──
 *   web: {
 *     category:         String,
 *     tech_frontend:    [String],
 *     tech_backend:     [String],
 *     tech_database:    [String],
 *     tech_tools:       [String],
 *     features:         [{ icon: String, title: String, description: String }],
 *     challenges:       [{ challenge: String, solution: String }],
 *     stats:            { total_pages: String, timeline: String, team_size: String, industry: String },
 *     impact_stats:     [{ icon: String, number: String, label: String }],
 *     timeline_phases:  [{ phase_name: String, description: String }],
 *     gallery:          [{ url: String, caption: String }],
 *   },
 *
 *   // ── App Development extra fields ──
 *   app: {
 *     platform:         String,
 *     tech_stack:       [String],
 *     play_store_url:   String,
 *     app_store_url:    String,
 *     features:         [{ icon: String, title: String, description: String }],
 *     screens_flows:    [String],
 *     challenges:       [{ challenge: String, solution: String }],
 *     impact_stats:     [{ icon: String, number: String, label: String }],
 *     gallery:          [{ url: String, caption: String }],
 *   },
 *
 *   // ── Software Development extra fields ──
 *   software: {
 *     software_type:    String,
 *     tech_stack:       [String],
 *     platform_os:      [String],
 *     modules:          [{ module_name: String, description: String }],
 *     integrations:     [String],
 *     challenges:       [{ challenge: String, solution: String }],
 *     impact_stats:     [{ icon: String, number: String, label: String }],
 *     gallery:          [{ url: String, caption: String }],
 *   },
 *
 *   // ── Video Editing extra fields ──
 *   video: {
 *     video_type:       String,
 *     tools_used:       [String],
 *     duration:         String,
 *     style_mood:       [String],
 *     embed_url:        String,
 *     deliverables:     [String],
 *     thumbnail:        String,
 *     bts_gallery:      [{ url: String, caption: String }],
 *   },
 *
 *   // ── Digital Marketing extra fields ──
 *   marketing: {
 *     services:         [String],
 *     platforms:        [String],
 *     campaign_duration:String,
 *     target_audience:  String,
 *     impact_stats:     [{ icon: String, number: String, label: String }],
 *     gallery:          [{ url: String, caption: String }],
 *     case_study:       String,
 *   },
 *
 *   // ── UI/UX Design extra fields ──
 *   uiux: {
 *     design_type:      String,
 *     tools_used:       [String],
 *     screens_count:    Number,
 *     figma_url:        String,
 *     process_steps:    [{ step_name: String, description: String }],
 *     color_palette:    [String],       // hex values
 *     typography:       [String],
 *     gallery:          [{ url: String, caption: String }],
 *   },
 *
 *   // ── Branding extra fields ──
 *   branding: {
 *     services:         [String],
 *     tools_used:       [String],
 *     color_palette:    [String],
 *     typography:       [String],
 *     brand_voice:      String,
 *     deliverables:     [String],
 *     gallery:          [{ url: String, caption: String }],
 *   },
 * }
 */

/* ═══════════════════════════════════════════════════════
   1. DYNAMIC FIELDS — show/hide sections on type change
   ═══════════════════════════════════════════════════════ */
(function () {
  var typeSelect = document.getElementById("project_type");
  if (!typeSelect) return;

  // Map select value → section id suffix
  var sectionMap = {
    web_development: "web",
    app_development: "app",
    software_development: "software",
    video_editing: "video",
    digital_marketing: "marketing",
    uiux_design: "uiux",
    branding: "branding",
  };

  function showSection(type) {
    // Hide all
    document.querySelectorAll(".dynamic-section").forEach(function (s) {
      s.classList.remove("active");
    });
    // Show matching
    var key = sectionMap[type];
    if (key) {
      var el = document.getElementById("section-" + key);
      if (el) el.classList.add("active");
    }
  }

  typeSelect.addEventListener("change", function () {
    showSection(this.value);
  });

  // Init on load (in case of back-navigation with pre-selected value)
  if (typeSelect.value) showSection(typeSelect.value);
})();

/* ═══════════════════════════════════════════════════════
   2. SHORT DESCRIPTION CHAR COUNTER (max 200)
   ═══════════════════════════════════════════════════════ */
(function () {
  var textarea = document.getElementById("short_description");
  var badge = document.getElementById("short_desc_counter");
  var MAX = 200;
  if (!textarea || !badge) return;

  function update() {
    var len = textarea.value.length;
    var remaining = MAX - len;
    badge.textContent = remaining + "/" + MAX;
    badge.className = "char-counter-badge";
    if (remaining < 40) badge.classList.add("warn");
    if (remaining < 0) badge.classList.add("over");
  }

  textarea.addEventListener("input", update);
  update();
})();

/* ═══════════════════════════════════════════════════════
   3. TAG INPUT (multi-tag: type + Enter or comma)
   Creates tags for any .tag-input-wrap[data-field]
   ═══════════════════════════════════════════════════════ */
(function () {
  function initTagInput(wrap) {
    var fieldName = wrap.getAttribute("data-field");
    var input = wrap.querySelector(".tag-input-inner");
    if (!input) return;

    function addTag(val) {
      val = val.trim().replace(/,+$/, "").trim();
      if (!val) return;

      // Avoid duplicates
      var existing = Array.from(wrap.querySelectorAll(".tag-pill span")).map(
        function (s) {
          return s.textContent.trim().toLowerCase();
        },
      );
      if (existing.includes(val.toLowerCase())) return;

      var pill = document.createElement("span");
      pill.className = "tag-pill";

      var text = document.createElement("span");
      text.textContent = val;

      var hidden = document.createElement("input");
      hidden.type = "hidden";
      hidden.name = fieldName;
      hidden.value = val;

      var btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = "×";
      btn.setAttribute("aria-label", "Remove " + val);
      btn.addEventListener("click", function () {
        pill.remove();
      });

      pill.appendChild(text);
      pill.appendChild(hidden);
      pill.appendChild(btn);

      wrap.insertBefore(pill, input);
      input.value = "";
    }

    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === ",") {
        e.preventDefault();
        addTag(input.value);
      } else if (e.key === "Backspace" && !input.value) {
        var pills = wrap.querySelectorAll(".tag-pill");
        if (pills.length) pills[pills.length - 1].remove();
      }
    });

    input.addEventListener("blur", function () {
      if (input.value.trim()) addTag(input.value);
    });

    wrap.addEventListener("click", function () {
      input.focus();
    });
  }

  document.querySelectorAll(".tag-input-wrap").forEach(initTagInput);
})();

/* ═══════════════════════════════════════════════════════
   4. REPEATER FIELDS (add/remove rows with animation)
   ═══════════════════════════════════════════════════════ */
(function () {
  document.querySelectorAll("[data-repeater]").forEach(function (btn) {
    var targetId = btn.getAttribute("data-repeater");
    var list = document.getElementById(targetId);
    if (!list) return;

    btn.addEventListener("click", function () {
      // Clone the template row
      var tmpl = list.querySelector(".repeater-row-template");
      if (!tmpl) return;

      var row = tmpl.cloneNode(true);
      row.classList.remove("repeater-row-template");
      row.style.display = "";
      row.removeAttribute("hidden");

      // Clear all inputs/textareas in cloned row
      row.querySelectorAll("input, textarea, select").forEach(function (el) {
        el.value = "";
      });

      // Re-init tag inputs inside cloned rows
      row.querySelectorAll(".tag-input-wrap").forEach(function (wrap) {
        // Remove any stale pills
        wrap.querySelectorAll(".tag-pill").forEach(function (p) {
          p.remove();
        });
        initTagInputSingle(wrap);
      });

      // Wire remove button
      var removeBtn = row.querySelector(".repeater-remove");
      if (removeBtn) {
        removeBtn.addEventListener("click", function () {
          row.style.transition = "opacity 0.2s";
          row.style.opacity = "0";
          setTimeout(function () {
            row.remove();
          }, 200);
        });
      }

      list.appendChild(row);
    });

    // Wire existing remove buttons (first row is non-removable template; real rows added later)
  });

  // Standalone tag init used inside cloned rows
  function initTagInputSingle(wrap) {
    var fieldName = wrap.getAttribute("data-field");
    var input = wrap.querySelector(".tag-input-inner");
    if (!input) return;

    function addTag(val) {
      val = val.trim().replace(/,+$/, "").trim();
      if (!val) return;
      var pill = document.createElement("span");
      pill.className = "tag-pill";

      var text = document.createElement("span");
      text.textContent = val;

      var hidden = document.createElement("input");
      hidden.type = "hidden";
      hidden.name = fieldName;
      hidden.value = val;

      var btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = "×";
      btn.addEventListener("click", function () {
        pill.remove();
      });

      pill.appendChild(text);
      pill.appendChild(hidden);
      pill.appendChild(btn);
      wrap.insertBefore(pill, input);
      input.value = "";
    }

    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === ",") {
        e.preventDefault();
        addTag(input.value);
      } else if (e.key === "Backspace" && !input.value) {
        var pills = wrap.querySelectorAll(".tag-pill");
        if (pills.length) pills[pills.length - 1].remove();
      }
    });
    input.addEventListener("blur", function () {
      if (input.value.trim()) addTag(input.value);
    });
    wrap.addEventListener("click", function () {
      input.focus();
    });
  }

  // Expose for external use (repeaters may create tag inputs)
  window._initTagInput = initTagInputSingle;
})();

/* ═══════════════════════════════════════════════════════
   5. SINGLE-FILE UPLOAD WITH PREVIEW (hero image / thumbnail)
   ═══════════════════════════════════════════════════════ */
(function () {
  document.querySelectorAll("[data-single-upload]").forEach(function (zone) {
    var previewId = zone.getAttribute("data-single-upload");
    var preview = document.getElementById(previewId);
    var fileInput = zone.querySelector('input[type="file"]');
    if (!fileInput || !preview) return;

    var img = preview.querySelector("img");
    var removeBtn = preview.querySelector(".remove-preview");

    fileInput.addEventListener("change", function () {
      var file = fileInput.files[0];
      if (!file || !file.type.startsWith("image/")) return;
      var reader = new FileReader();
      reader.onload = function (e) {
        img.src = e.target.result;
        preview.style.display = "block";
        zone.style.display = "none";
      };
      reader.readAsDataURL(file);
    });

    if (removeBtn) {
      removeBtn.addEventListener("click", function () {
        img.src = "";
        fileInput.value = "";
        preview.style.display = "none";
        zone.style.display = "";
      });
    }

    // Drag and drop
    zone.addEventListener("dragover", function (e) {
      e.preventDefault();
      zone.classList.add("drag-over");
    });
    zone.addEventListener("dragleave", function () {
      zone.classList.remove("drag-over");
    });
    zone.addEventListener("drop", function (e) {
      e.preventDefault();
      zone.classList.remove("drag-over");
      var file = e.dataTransfer.files[0];
      if (!file || !file.type.startsWith("image/")) return;
      fileInput.files = e.dataTransfer.files;
      fileInput.dispatchEvent(new Event("change"));
    });
  });
})();

/* ═══════════════════════════════════════════════════════
   6. MULTI-FILE UPLOAD WITH PREVIEW GRID + CAPTIONS
   ═══════════════════════════════════════════════════════ */
(function () {
  document.querySelectorAll("[data-multi-upload]").forEach(function (zone) {
    var gridId = zone.getAttribute("data-multi-upload");
    var grid = document.getElementById(gridId);
    var fileInput = zone.querySelector('input[type="file"]');
    var captionFieldName = zone.getAttribute("data-caption-field") || "caption";
    if (!fileInput || !grid) return;

    function addFiles(files) {
      Array.from(files).forEach(function (file) {
        if (!file.type.startsWith("image/")) return;
        var reader = new FileReader();
        reader.onload = function (e) {
          var item = document.createElement("div");
          item.className = "multi-preview-item";

          var img = document.createElement("img");
          img.src = e.target.result;
          img.alt = file.name;

          var caption = document.createElement("input");
          caption.className = "caption-input";
          caption.type = "text";
          caption.name = captionFieldName + "[]";
          caption.placeholder = "Caption…";

          var removeBtn = document.createElement("button");
          removeBtn.type = "button";
          removeBtn.className = "remove-img";
          removeBtn.textContent = "×";
          removeBtn.setAttribute("aria-label", "Remove image");
          removeBtn.addEventListener("click", function () {
            item.remove();
          });

          item.appendChild(img);
          item.appendChild(removeBtn);
          item.appendChild(caption);
          grid.appendChild(item);
        };
        reader.readAsDataURL(file);
      });
      // Reset so same file can be re-added
      fileInput.value = "";
    }

    fileInput.addEventListener("change", function () {
      addFiles(fileInput.files);
    });

    zone.addEventListener("dragover", function (e) {
      e.preventDefault();
      zone.classList.add("drag-over");
    });
    zone.addEventListener("dragleave", function () {
      zone.classList.remove("drag-over");
    });
    zone.addEventListener("drop", function (e) {
      e.preventDefault();
      zone.classList.remove("drag-over");
      addFiles(e.dataTransfer.files);
    });
  });
})();

/* ═══════════════════════════════════════════════════════
   7. COLOR PALETTE PICKER (up to 5 swatches)
   ═══════════════════════════════════════════════════════ */
(function () {
  document
    .querySelectorAll("[data-color-palette]")
    .forEach(function (container) {
      var listId = container.getAttribute("data-color-palette");
      var list = document.getElementById(listId);
      var addBtn = container.querySelector(".add-swatch-btn");
      var MAX = 5;
      if (!list || !addBtn) return;

      var fieldName =
        container.getAttribute("data-field-name") || "color_palette";

      function addSwatch(initialColor) {
        if (list.querySelectorAll(".color-swatch-item").length >= MAX) return;

        var item = document.createElement("div");
        item.className = "color-swatch-item";

        var picker = document.createElement("input");
        picker.type = "color";
        picker.name = fieldName + "[]";
        picker.value = initialColor || "#044bab";

        var hexLabel = document.createElement("span");
        hexLabel.className = "hex-label";
        hexLabel.textContent = picker.value.toUpperCase();

        picker.addEventListener("input", function () {
          hexLabel.textContent = picker.value.toUpperCase();
        });

        var removeBtn = document.createElement("button");
        removeBtn.type = "button";
        removeBtn.className = "remove-swatch";
        removeBtn.textContent = "✕";
        removeBtn.addEventListener("click", function () {
          item.remove();
          updateAddBtn();
        });

        item.appendChild(picker);
        item.appendChild(hexLabel);
        item.appendChild(removeBtn);
        list.appendChild(item);
        updateAddBtn();
      }

      function updateAddBtn() {
        addBtn.disabled =
          list.querySelectorAll(".color-swatch-item").length >= MAX;
      }

      addBtn.addEventListener("click", function () {
        addSwatch();
      });
      // Start with one swatch
      addSwatch("#044bab");
    });
})();

/* ═══════════════════════════════════════════════════════
   8. VIDEO EMBED PREVIEW (YouTube / Vimeo URL → iframe)
   ═══════════════════════════════════════════════════════ */
(function () {
  document.querySelectorAll("[data-video-preview]").forEach(function (input) {
    var previewId = input.getAttribute("data-video-preview");
    var preview = document.getElementById(previewId);
    if (!preview) return;

    function getEmbedUrl(url) {
      // YouTube
      var ytMatch = url.match(
        /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{11})/,
      );
      if (ytMatch) return "https://www.youtube.com/embed/" + ytMatch[1];
      // Vimeo
      var vmMatch = url.match(/vimeo\.com\/(\d+)/);
      if (vmMatch) return "https://player.vimeo.com/video/" + vmMatch[1];
      return null;
    }

    input.addEventListener("input", function () {
      var embed = getEmbedUrl(input.value.trim());
      if (embed) {
        preview.style.display = "block";
        var iframe = preview.querySelector("iframe");
        if (!iframe) {
          iframe = document.createElement("iframe");
          iframe.setAttribute("allowfullscreen", "");
          iframe.setAttribute("allow", "autoplay; encrypted-media");
          preview.appendChild(iframe);
        }
        iframe.src = embed;
      } else {
        preview.style.display = "none";
      }
    });
  });
})();

/* ═══════════════════════════════════════════════════════
   9. FORM VALIDATION
   ═══════════════════════════════════════════════════════ */
(function () {
  var form = document.getElementById("addWorkForm");
  if (!form) return;

  var REQUIRED_FIELDS = [
    "project_title",
    "project_type",
    "client_name",
    "year",
    "short_description",
  ];

  function validateField(id) {
    var el = document.getElementById(id);
    if (!el) return true;
    var fieldWrap = el.closest(".form-field");
    var valid = el.value.trim() !== "";
    if (fieldWrap) {
      fieldWrap.classList.toggle("has-error", !valid);
    }
    return valid;
  }

  function validateAll(statusValue) {
    // Update hidden status field before validating
    var statusEl = document.getElementById("status");
    if (statusEl && statusValue) statusEl.value = statusValue;

    var allValid = true;
    REQUIRED_FIELDS.forEach(function (id) {
      if (!validateField(id)) allValid = false;
    });
    return allValid;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
  });

  var draftBtn = document.getElementById("btn_draft");
  var publishBtn = document.getElementById("btn_publish");

  if (draftBtn) {
    draftBtn.addEventListener("click", function () {
      var valid = validateAll("draft");
      if (valid) {
        console.log(
          "Save as Draft — collect form data here and POST to /api/projects",
        );
        showToast("Saved as Draft ✓", "#64748b");
      }
    });
  }

  if (publishBtn) {
    publishBtn.addEventListener("click", function () {
      var valid = validateAll("published");
      if (valid) {
        console.log(
          "Publish — collect form data here and POST to /api/projects",
        );
        showToast("Project Published ✓", "#16a34a");
      }
    });
  }

  // Live clear error on input
  REQUIRED_FIELDS.forEach(function (id) {
    var el = document.getElementById(id);
    if (el) {
      el.addEventListener("input", function () {
        validateField(id);
      });
    }
  });

  function showToast(msg, bg) {
    var t = document.createElement("div");
    t.textContent = msg;
    Object.assign(t.style, {
      position: "fixed",
      bottom: "28px",
      right: "28px",
      background: bg || "#1a3c8f",
      color: "#fff",
      padding: "12px 24px",
      borderRadius: "8px",
      fontFamily: "Inter, sans-serif",
      fontWeight: "600",
      fontSize: "14px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
      zIndex: "9999",
      animation: "fadeInUp 0.25s ease",
    });
    document.body.appendChild(t);
    setTimeout(function () {
      t.remove();
    }, 2800);
  }
})();
